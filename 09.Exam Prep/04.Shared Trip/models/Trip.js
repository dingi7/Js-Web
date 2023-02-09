const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    startPoint: { type: String, required: true, minLength: 4 },
    endPoint: { type: String, required: true, minLength: 4 },
    date: {
        type: String,
        required: true,
    },
    time: { type: String, required: true },
    carImage: { type: String, required: true, match: /^https?:\/\// },
    carBrand: { type: String, required: true, minLength: 4 },
    seats: { type: Number, required: true, enum: [0, 1, 2, 3, 4] },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: { type: String, required: true, minLength: 10 },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Trip', schema);
