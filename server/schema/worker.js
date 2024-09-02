const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkerRow = new Schema({
    id: { type: Schema.Types.String, required: true },
    fullName: { type: String, required: true },
    skills: { type: [String], required: true },
});

const Worker = mongoose.model('Worker', WorkerRow);

const workerSchema = new Schema({
    organizationId: { type: Schema.Types.String, required: true },
    workers: { type: [Worker.schema], required: true }
});

const Workers = mongoose.model('Workers', workerSchema);

module.exports = {
    Worker,
    Workers
}
