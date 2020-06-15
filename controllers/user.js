const env = process.env.NODE_ENV || 'development';
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

const registerUser = async (username, password) => {
    //hashing
    const salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(password, salt);

    let user = new User({
        username,
        password: hashedPass,
    });
    let userObject = await user.save();

    return userObject;
};

const loginUser = async (username, password) => {
    let user = await User.findOne({
        username,
    });
    let status = await bcrypt.compare(password, user.password);
    return [status, user];
};

const tokenGenerator = (user) => {
    let token = jwt.sign({
            userId: user._id,
            username: user.username,
        },
        `${config.privateKey}`
    );

    return token;
};

const checkAuth = (req, res, next) => {
    let token = req.cookies['aid'];
    // if (!token) {
    //     req.isLoggedIn = false;
    //     res.redirect('/login');
    // }

    try {
        jwt.verify(token, config.privateKey);
        req.isLoggedIn = true;
        next()

    } catch {
        req.isLoggedIn = false;
        return res.redirect('/login');
    }
};


const openPagesCheck = (req, res, next) => {
    let token = req.cookies['aid'];
    try {
        jwt.verify(token, config.privateKey);
        req.isLoggedIn = true;
    } catch {
        req.isLoggedIn = false;
    }
    next()
}
module.exports = {
    registerUser,
    tokenGenerator,
    loginUser,
    checkAuth,
    openPagesCheck
};