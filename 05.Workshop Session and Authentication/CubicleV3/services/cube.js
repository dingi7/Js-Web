const Cube = require('../models/Cube');

async function getAll(query) {
    const searchParams = {
        difficulty: {
            $gte: Number(query.from) || 0,
            $lte: Number(query.to) || 6,
        },
        name: { $regex: query.search || '', $options: 'i' },
    };

    return Cube.find(searchParams).lean();
}

async function getById(id) {
    return Cube.findById(id).populate('accessories').lean();
}

async function create(cube) {
    const newCube = new Cube(cube);
    return newCube.save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);
    if (!existing) {
        throw new Error('Cube with that id is not found.');
    }
    existing.name = cube.name;
    existing.description = cube.description;
    existing.imageUrl = cube.imageUrl;
    existing.difficulty = cube.difficulty;

    return existing.save();
}

module.exports = {
    getAll,
    getById,
    create,
    edit
}