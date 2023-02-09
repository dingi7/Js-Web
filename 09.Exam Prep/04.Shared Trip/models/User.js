const mongoose = require('mongoose');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [emailRegex, 'Invalid email format'],
    },
    password: { type: String, required: true },
    gender: { type: String, required: true},
    tripHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
});

module.exports = mongoose.model('User', schema);
