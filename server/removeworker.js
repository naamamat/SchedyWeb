const { Schedule } = require('./schema/schedule');

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

module.exports = {
    removeWorkerFromSchedule
}
