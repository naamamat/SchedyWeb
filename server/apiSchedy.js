const {removeWorkerFromSchedule} = require('./removeworker')
const { Schedule } = require('./schema/schedule');
const { addWorkerFromReplaceable }= require('./addWorker')
const { replaceWorkerInSchedule }= require('./replaceWorker')

app.post('/api/removeWorker', async (req, res) => {
    const { shiftId, workerId, workers, organizationId } = req.body

    try {
        
        let check = await Schedule.findOne({ shiftId });
        if (!check) {
            return res.status(404).send({ error: 'shift not found.' });
        }
        const schedule = await Schedule.find({ organizationId });

        await removeWorkerFromSchedule(shiftId, workerId)
        const updatedSchedule = findReplaceableWorkers(schedule, workers);

        await Schedule.deleteMany({ organizationId });
        const newSchedule = new Schedule(updatedSchedule);
        await newSchedule.save();
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }
    
})


app.post('/api/addWorker', async (req, res) => {
    const { shiftId, workerId, workers, organizationId } = req.body

    try {
        
        let check = await Schedule.findOne({ shiftId });
        if (!check) {
            return res.status(404).send({ error: 'shift not found.' });
        }
        const schedule = await Schedule.find({ organizationId });

        await addWorkerFromReplaceable(shiftId, workerId)
        const updatedSchedule = findReplaceableWorkers(schedule, workers);

        await Schedule.deleteMany({ organizationId });
        const newSchedule = new Schedule(updatedSchedule);
        await newSchedule.save();
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }
    
})

app.post('/api/replace', async (req, res) => {
    const { shiftId, workerIdTOREPLACE, workerIdNEW, workers, organizationId } = req.body

    try {
        
        let check = await Schedule.findOne({ shiftId });
        if (!check) {
            return res.status(404).send({ error: 'shift not found.' });
        }
        const schedule = await Schedule.find({ organizationId });
        
        await replaceWorkerInSchedule(shiftId, workerIdTOREPLACE, workerIdNEW)
        const updatedSchedule = findReplaceableWorkers(schedule, workers);

        await Schedule.deleteMany({ organizationId });
        const newSchedule = new Schedule(updatedSchedule);
        await newSchedule.save();
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }
    
})