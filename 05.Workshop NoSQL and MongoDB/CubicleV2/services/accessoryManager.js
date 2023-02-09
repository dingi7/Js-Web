const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube')

async function createAcc(accessoryTemplate) {
    const accessory = new Accessory(accessoryTemplate);
    return accessory.save();
}

async function getAllAccessories(attached) {
    const accessories = await Accessory.find({ _id: { $nin: attached }}).lean();
    return accessories
}

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    if (!cube || !accessory) {
        throw new Error('An item with that id was not found in the database.');
    }

    cube.populate('accessories');
    cube.accessories.forEach(a => {
        if(a._id == accessoryId){
            throw new Error(`The cube already has this accessory attached`);
        }
    })

    cube.accessories.push(accessory);
    await cube.save();
}

module.exports = {
    createAcc,
    getAllAccessories,
    attachAccessory
}