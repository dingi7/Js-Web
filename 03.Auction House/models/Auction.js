const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 4 },
    description: { type: String, required: true, maxLength: 200 },
    category: {
        type: String,
        required: true,
        enum: ['vehicles', 'estate', 'furniture', 'electronics', 'other'],
    },
    image: { type: String },
    price: { type: Number, required: true, min: 0.1 },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    closed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Auction', schema);
