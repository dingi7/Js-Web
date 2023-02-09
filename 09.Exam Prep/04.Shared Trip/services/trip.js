const Trip = require('../models/Trip');

async function getTrips() {
    const trips = await Trip.find({}).lean();
    return trips;
}

async function getTripById(id) {
    const trip = await Trip.findById(id).populate('owner').populate('buddies').lean();
    return trip;
}

async function createTrip(trip, user) {
    const newTrip = new Trip(trip);
    await newTrip.save();
    user.tripHistory.push(newTrip);
    await user.save();
    return newTrip;
}

async function edit(id, trip) {
    const existing = await Trip.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }
    trip.price = trip.price || existing.price;
    Object.assign(existing, trip);
    await existing.save();
    return existing;
}

async function deleteTrip(id) {
    try {
        await Trip.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
}

async function joinTrip(id, user){
    const trip = await Trip.findById(id).populate('owner').populate('buddies')
    trip.seats = trip.seats - 1
    trip.buddies.push(user)
    await trip.save()
}


module.exports = {
    getTrips,
    getTripById,
    createTrip,
    deleteTrip,
    edit,
    joinTrip
};
