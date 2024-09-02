const { Schedule } = require('./schema/schedule');

// Function to move a worker from replaceableWorkers to workers
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
        await schedule.save();

        console.log(`Worker ${workerId} moved from replaceableWorkers to workers in schedule ${scheduleId}`);
    } catch (error) {
        console.error(`Failed to add worker: ${error.message}`);
    }
}


module.exports = {
    addWorkerFromReplaceable
}
