const { Schedule } = require('../schema/schedule');

async function addWorkerFromReplaceable(scheduleId, workerId) {
    try {
        // Find the schedule by its ID
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            throw new Error('Schedule not found');
        }

        // Find the worker in the replaceableWorkers array
        const workerIndex = schedule.replaceableWorkers.findIndex(worker => worker._id.equals(workerId));

        if (workerIndex === -1) {
            throw new Error('Worker not found in replaceableWorkers');
        }

        // Get the worker from the replaceableWorkers array
        const worker = schedule.replaceableWorkers[workerIndex];

        // Remove the worker from the replaceableWorkers array
        schedule.replaceableWorkers.splice(workerIndex, 1);

        // Add the worker to the workers array
        schedule.workers.push(worker);

        // Save the updated schedule
        const newSchedule = await schedule.save();


        console.log(`Worker ${workerId} moved from replaceableWorkers to workers in schedule ${scheduleId}`);
        return newSchedule;

    } catch (error) {
        console.error(`Failed to add worker: ${error.message}`);
    }
}

// Function to remove a worker from a schedule
async function removeWorkerFromSchedule(scheduleId, workerId) {
    try {
        // Find the schedule by its ID
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            throw new Error('Schedule not found');
        }

        // Filter out the worker from the workers array
        schedule.workers = schedule.workers.filter(worker => !worker._id.equals(workerId));

        // Save the updated schedule
        await schedule.save();

        console.log(`Worker ${workerId} removed from schedule ${scheduleId}`);
    } catch (error) {
        console.error(`Failed to remove worker: ${error.message}`);
    }
}

// Function to replace a worker in the workers array with a worker from replaceableWorkers
async function replaceWorkerInSchedule(scheduleId, workerIdToReplace, replacementWorkerId) {
    try {
        // Find the schedule by its ID
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            throw new Error('Schedule not found');
        }

        // Find the worker to replace in the workers array
        const workerIndex = schedule.workers.findIndex(worker => worker._id.equals(workerIdToReplace));
        if (workerIndex === -1) {
            throw new Error('Worker to replace not found in workers array');
        }

        // Find the replacement worker in the replaceableWorkers array
        const replacementWorkerIndex = schedule.replaceableWorkers.findIndex(worker => worker._id.equals(replacementWorkerId));
        if (replacementWorkerIndex === -1) {
            throw new Error('Replacement worker not found in replaceableWorkers array');
        }

        // Get the replacement worker from the replaceableWorkers array
        const replacementWorker = schedule.replaceableWorkers[replacementWorkerIndex];

        // Replace the worker in the workers array with the replacement worker
        const replacedWorker = schedule.workers[workerIndex];
        schedule.workers[workerIndex] = replacementWorker;

        // Remove the replacement worker from the replaceableWorkers array
        schedule.replaceableWorkers.splice(replacementWorkerIndex, 1);

        // Add the replaced worker to the replaceableWorkers array
        schedule.replaceableWorkers.push(replacedWorker);

        // Save the updated schedule
        await schedule.save();

        console.log(`Worker ${workerIdToReplace} replaced with worker ${replacementWorkerId} in schedule ${scheduleId}`);
    } catch (error) {
        console.error(`Failed to replace worker: ${error.message}`);
    }
}

module.exports = {
    addWorkerFromReplaceable,
    removeWorkerFromSchedule,
    replaceWorkerInSchedule
}
