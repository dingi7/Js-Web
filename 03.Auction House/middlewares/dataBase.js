const mongoose = require('mongoose');
const {
    getAuctions,
    getAuctionById,
    createAuction,
    deleteAuction,
    bid,
    edit,
    closeAuction
} = require('../services/auction');

async function init() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/examPrep3');

    return (req, res, next) => {
        req.storage = {
            getAuctions,
            getAuctionById,
            createAuction,
            deleteAuction,
            bid,
            edit,
            closeAuction
        };
        next();
    };
}

module.exports = init;
