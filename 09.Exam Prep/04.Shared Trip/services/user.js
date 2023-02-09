const User = require('../models/User');

async function createUser(email, password, gender) {
    const newUser = new User({ email, password, gender });
    return await newUser.save();
}

async function getUser(email) {
    return await User.findOne({ email: email });
}
async function getUserLean(email) {
    return await User.findOne({ email: email }).populate('tripHistory').lean();
}

module.exports = {
    createUser,
    getUser,
    getUserLean
};
