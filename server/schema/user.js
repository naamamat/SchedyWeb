const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: Number, required: true, unique: true },
    orgId: { type: String, required: true, unique: false },
    password: { type: String, required: true, select: false },
    photo: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
