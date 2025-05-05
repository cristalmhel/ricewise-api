const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    fullname: { type: String, required: false, trim: true, default: '' },
    region: { type: String, required: false },
    province: { type: String, required: false },
    city: { type: String, required: false },
    barangay: { type: String, required: false },
    deactivated: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);