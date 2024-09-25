const { nextSunday, endOfWeek, startOfDay } = require('date-fns');
const { closestFutureSunday } = require("../utils/dates");
const { Workers } = require('../schema/worker');
const { Shift } = require('../schema/shift');
const { processShift } = require('../utils/processShift');
const { findReplaceableWorkers } = require('../utils/processShift');
const { Schedule } = require('../schema/schedule');

// upload the csv files to the server and create a schedule
const createSchedule = async (req, res) => {
    const { workerFile, shiftFile } = req.body;
    const { org_id } = req.params;
    if (!workerFile || !shiftFile) {
        res.status(400).send('Please provide both worker and shift files');
        return;
    }
    if (!org_id) {
        res.status(400).send('Please provide organization id');
        return;
    }
    // Get the first day of the next week
    const today = new Date();
    const nextStartOfWeek = closestFutureSunday(today);
    const nextEndOfWeek = endOfWeek(nextStartOfWeek, { weekStartsOn: 0 }); // saturday

    // try to fetch the current data, if exists - update, otherwise insert new
    try {
        // { id, fullNames, skill1, skill2, skill3 }

        const workers = workerFile.filter((i) => i.worker_id)
            .map(({ worker_id, name, ...rest }) => ({ id: worker_id, fullName: name, skills: Object.values(rest).filter((i) => i) }))

        await Workers.insertMany([{ organizationId: org_id, workers }]);

        await Shift.insertMany([{
            organizationId: org_id,
            shifts: shiftFile,
            weekStart: nextStartOfWeek,
            weekEnd: nextEndOfWeek
        }]);

        const processedSchedule = await processShift(shiftFile, workers, org_id, nextStartOfWeek);

        const result = await Schedule.insertMany(processedSchedule);

        setTimeout(()=> {
            const scheduleWithReplaceableWorkers = findReplaceableWorkers(result, workers);
            Promise.all(scheduleWithReplaceableWorkers.map(async (s) =>  s.save()));
        }, 100)

        res.send({ schedule: processedSchedule })
    } catch (e) {
        console.log('Error in inserting files: ', e);
        res.status(500).send('Error in inserting files');
    }
};

// get the current schedule from server
const getSchedule = async (req, res) => {
    const { week } = req.query;
    const { org_id } = req.params;
    if (!org_id) {
        res.status(400).send('Please provide organization id');
    }
    let filterByWeek = nextSunday(new Date());
    if (week) {
        filterByWeek = new Date(week);
    }
    filterByWeek = startOfDay(filterByWeek)

    const schedule = await Schedule.find({ organizationId: org_id, week: filterByWeek }).sort({ weekStart: -1, shiftStartTime: 1 });
    res.send({ schedule });
};

const findReplaceableWorkersForShchedule = async (req, res) => {
    try {

        const { org_id } = req.params;
        const { week } = req.query;
        if (!org_id || !week) {
            res.status(400).send('Please provide organization id and week');
            return;
        }
        let filterByWeek = nextSunday(new Date());
        if (week) {
            filterByWeek = new Date(week);
        }
        filterByWeek = startOfDay(filterByWeek)


        const schedule = await Schedule.find({ organizationId: org_id, week: filterByWeek }).sort({ weekStart: -1, shiftStartTime: 1 });

        if (!schedule) {
            return res.status(404).send(`Schedule for week ${week} not found`);
        }

        if (schedule.length === 0) {
            return res.send({ replaceableWorkers: [] });
        }

        const missingReplaceableWorkers = schedule.some((s) => !s.replaceableWorkers);
        if (!missingReplaceableWorkers) {
            res.send({ replaceableWorkers: schedule });
            return;
        }

        const workers = await Workers.find({ organizationId: org_id });
        if (!workers || workers.length === 0) {
            res.status(404).send('Workers for organization cannot be found');
            return;
        }

        const scheduleWithReplaceableWorkers = await findReplaceableWorkers(schedule, workers);
        const result = await Promise.all(scheduleWithReplaceableWorkers.map(async (s) =>  s.save()));

        res.send({ replaceableWorkers: result });
    } catch (e) {
        console.log('Error in finding replaceable workers: ', e);
        res.status(500).send('Error in finding replaceable workers');
    }
}


const generateNewScheduleAfterChanges = async (req, res) => {
    try {
        const { orgId } = req.params;

        // Get the first day of the next week
        const today = new Date();
        const nextStartOfWeek = closestFutureSunday(today);

        const orgWorkers = await Workers.findOne({ organizationId: orgId }).lean();
        const orgShifts = await Shift.findOne({ organizationId: orgId }).lean();

        const deletedShifts = await Schedule.deleteMany({ organizationId: orgId, week: nextStartOfWeek });

        if (!orgWorkers?.workers || !orgShifts?.shifts) {
            res.status(404).send('Workers or shifts for organization cannot be found');
            return;
        }
        if (deletedShifts.deletedCount < 0) {
            res.status(404).send('Error in deleting shifts');
            return;
        }

        const processedSchedule = await processShift(orgShifts?.shifts, orgWorkers?.workers, orgId, nextStartOfWeek);

        const result = await Schedule.insertMany(processedSchedule);

        setTimeout(()=> {
            const scheduleWithReplaceableWorkers = findReplaceableWorkers(result, orgWorkers?.workers);
            Promise.all(scheduleWithReplaceableWorkers.map(async (s) =>  s.save()));
        }, 100)

        res.send({ schedule: processedSchedule })

    } catch (e) {
        console.log('Error in inserting files: ', e);
        res.status(500).send('Error in inserting files');
    }

}
module.exports = { createSchedule, getSchedule, findReplaceableWorkersForShchedule, generateNewScheduleAfterChanges };
