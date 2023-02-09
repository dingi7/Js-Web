const uniqid = require('uniqid');
const fs = require('fs/promises');

let data = {};

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('Error while trying to read from database ' + err);
    }

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit
        };
        next();
    };
}

async function getAll(query) {
    let cubes = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
    if(query.search){
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(query.search.toLowerCase()))
    }
    if(query.from){
        cubes = cubes.filter(cube => Number(cube.difficulty) >= Number(query.from))
    }
    if(query.to){
        cubes = cubes.filter(cube => Number(cube.difficulty) <= Number(query.to))
    }
    return cubes
}

async function getById(id) {
    return data[id];
}

async function create(cube) {
    const id = uniqid();
    data[id] = cube;

    try {
        fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error while saving database.');
    }
}

async function edit(id, cube){
    if(data[id] == undefined){
        return 'Cube with that id is not found.'
    }
    data[id] = cube

    try {
        fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error while saving database.');
    }
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
};
