const { Worker } = require('./worker');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    organizationId: { type: String, required: true },
    week: { type: Date, required: true },
    shiftDate: { type: Date, required: true },
    shiftStartTime: { type: String, required: true },
    shiftEndTime: { type: String, required: true },
    workers: { type: [Worker.schema], required: true },
    replaceableWorkers: { type: [Worker.schema], required: true },
    skill: { type: String, required: true }
  });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {
    Schedule
}
