const User = require('../models/userModel')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const privateKey = 'my-private-key-workshop'
const registerUser = async (username, password) => {
    //hashing
    const salt = await bcrypt.genSalt(10)
    let hashedPass = await bcrypt.hash(password, salt)

    let user = new User({
        username,
        password: hashedPass
    })
    let userObject = await user.save()

    return userObject
}


const tokenGenerator = (user) => {

    let token = jwt.sign({
        userId: user._id,
        username: user.username
    }, privateKey)

    return token
}

module.exports = {
    registerUser,
    tokenGenerator
}