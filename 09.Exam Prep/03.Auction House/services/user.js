const User = require('../models/User');

async function createUser(email, firstName, lastName, password) {
    const newUser = new User({ email, firstName, lastName, password });
    return await newUser.save();
}

async function getUser(email) {
    return await User.findOne({ email: email })
        .populate({
            path: 'closedAuctions',
            populate: {
                path: 'bidder',
                select: 'firstName lastName',
            },
        })
        .lean();
}

async function pushAuction(auction, userId) {
    const user = await User.findById(userId).populate('closedAuctions');
    console.log(user);
    user.closedAuctions.push(auction);
    await user.save();
}

module.exports = {
    createUser,
    getUser,
    pushAuction,
};
