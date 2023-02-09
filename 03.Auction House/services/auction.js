const Auction = require('../models/Auction');

async function getAuctions() {
    const auctions = await Auction.find({ closed: false }).lean();
    return auctions;
}

async function getAuctionById(id) {
    const auction = await Auction.findById(id)
        .populate('owner')
        .populate('bidder')
        .lean();
    return auction;
}

async function createAuction(auction) {
    const newAuction = new Auction(auction);
    await newAuction.save();
    return newAuction;
}

async function bid(id, user, amount) {
    const auction = await Auction.findById(id);
    if (!auction) {
        throw new Error('Not found');
    }
    auction.bidder = user;
    auction.price = amount;
    await auction.save();
}

async function edit(id, auction) {
    const existing = await Auction.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }
    auction.price = auction.price || existing.price
    Object.assign(existing, auction);
    await existing.save();
    return existing
}

async function deleteAuction(id) {
    try {
        await Auction.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
}

async function closeAuction(id){
    const auction = await Auction.findById(id)
    if (!auction) {
        throw new Error('Not found');
    }
    auction.closed = true
    // user.closedAuctions.push(auction)
    await auction.save()
    return auction
    // await user.save()
}

module.exports = {
    getAuctions,
    getAuctionById,
    createAuction,
    deleteAuction,
    bid,
    edit,
    closeAuction
};
