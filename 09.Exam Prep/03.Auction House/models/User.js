const mongoose = require('mongoose');

const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{1,}$/;

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [emailRegex, 'Invalid email format'],
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, minLength: 1 },
    lastName: { type: String, required: true, minLength: 1 },
    closedAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }],
});

module.exports = mongoose.model('User', schema);
