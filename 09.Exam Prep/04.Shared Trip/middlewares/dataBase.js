const mongoose = require('mongoose');
const {
    getTrips,
    getTripById,
    createTrip,
    deleteTrip,
    edit,
    joinTrip,
} = require('../services/trip');

async function init() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/examPrep4');

    return (req, res, next) => {
        req.storage = {
            getTrips,
            getTripById,
            createTrip,
            deleteTrip,
            edit,
            joinTrip,
        };
        next();
    };
}

module.exports = init;
