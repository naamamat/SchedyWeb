const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShiftRow = new Schema({
    skill: String,
    day: String,
    start_hour: Number,
    end_hour: Number,
    number_of_workers: Number,
    cost_per_worker: Number
});

// The file that the user uploads with the requirements for each weekly shift
const shiftSchema = new Schema({
    organizationId: { type: Schema.Types.String, required: true },
    weekStart: { type: Schema.Types.Date, required: true },
    weekEnd: { type: Schema.Types.Date, required: true },
    shifts: { type: [ShiftRow.schema], required: true }
});

const Shift = mongoose.model('Shift', shiftSchema);


module.exports = {
    Shift
}
