const mongoose = require('mongoose');
const { getAll, getById, create, edit} = require('./cubeManager')
const { getAllAccessories, createAcc, attachAccessory } = require('./accessoryManager')
// const Cu = require('../models/Cube');
const Accessory = require('../models/Accessory');

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
        };
        next();
    };
}

// async function getAll(query) {
//     const searchParams = {
//         difficulty: {
//             $gte: Number(query.from) || 0,
//             $lte: Number(query.to) || 6,
//         },
//         name: { $regex: query.search || '', $options: 'i' },
//     };

//     return Cu.find(searchParams).lean();
// }

// async function getById(id) {
//     return Cu.findById(id).populate('accessories').lean();
// }

// async function create(cube) {
//     const newCube = new Cu(cube);
//     return newCube.save();
// }

// async function edit(id, cube) {
//     const C = await Cu.findById(id);
//     if (!C) {
//         throw new Error('Cube with that id is not found.');
//     }
//     C.name = cube.name;
//     C.description = cube.description;
//     C.imageUrl = cube.imageUrl;
//     C.difficulty = cube.difficulty;

//     return C.save();
// }

// async function createAcc(acc) {
//     const accessory = new Accessory(acc);

//     return accessory.save();
// }

// async function getAllAccessories(existing) {
//     const accessories = await Accessory.find({ _id: { $nin: existing }}).lean();
//     return accessories
// }

// async function attachAccessory(cubeId, accessoryId) {
//     const cube = await Cu.findById(cubeId);
//     if (!cube) {
//         throw new Error('Cube with that id is not found.');
//     }

//     const accessory = await Accessory.findById(accessoryId);
//     if (!accessory) {
//         throw new Error('Accessory with that id is not found.');
//     }

//     cube.populate('accessories');
//     cube.accessories.forEach(a => {
//         if(a._id == accessoryId){
//             throw new Error(`The cube already has this accessory attached`);
//         }
//     })

//     cube.accessories.push(accessory);
//     await cube.save();
// }

module.exports = {
    init
};
