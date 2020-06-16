const Accessory = require('../models/accessoryModel');
const mongoose = require('mongoose');

const saveAccessory = (accessory) => {
    let newAcc = new Accessory(accessory);
    newAcc.save((err) => {
        if (err) {
            console.error(err);
        }

        return console.log('Congrats! New accessory was made!');
    });
};

const getAllAccessories = async () => {
    try {
        let allAccessories = await Accessory.find().lean()
        return allAccessories
    } catch {
        console.error(err)
    }
}

module.exports = {
    saveAccessory,
    getAllAccessories
}