const mongoose = require('mongoose');
const { getAll, getById, create, edit} = require('../services/cube')
const { getAllAccessories, createAcc, attachAccessory } = require('../services/accessory')
const { createUser, comparePassword, loginUser } = require('../services/user');


async function init() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/cubicle');

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit,
            createAcc,
            attachAccessory,
            getAllAccessories,
            createUser,
            comparePassword,
            loginUser
        };
        next();
    };
}

module.exports = {
    init
};
