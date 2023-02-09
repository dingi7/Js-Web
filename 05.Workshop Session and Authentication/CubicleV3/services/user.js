const User = require('../models/User')
const bcrypt = require('bcrypt')

async function createUser(user) {
    const newUser = new User(user)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    return await newUser.save()
}

async function getUser(username){
    return await User.findOne({username})
}

module.exports = {
    createUser,
    getUser
};