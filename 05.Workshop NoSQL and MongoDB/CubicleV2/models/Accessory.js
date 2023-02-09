const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : { type: String, required: true}, 
    description : {type: String, required: true},
    imageUrl : { type: String, required: true}, // validate if start with http/s
    // cubes : { type: mongoose.Schema.Types.ObjectId, ref: 'cube'}
})

module.exports = mongoose.model('accessory', schema)