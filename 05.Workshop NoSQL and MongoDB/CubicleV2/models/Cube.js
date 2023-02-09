const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : { type: String, required: true},
    description : {type: String, required: true, maxLenght: 500},
    imageUrl : { type: String, required: true, match: /^https?:\/\//},
    difficulty : { type: Number, required: true, min: 1, max : 6 },
    accessories : [{ type: mongoose.Schema.Types.ObjectId, ref: 'accessory' }]
})

module.exports = mongoose.model('Cube', schema)