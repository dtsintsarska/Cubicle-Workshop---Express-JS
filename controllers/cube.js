const Cube = require('../models/cubeModel');
const mongoose = require('mongoose');

let getAllCubes = async () => {
    try {
        let cubes = await Cube.find().lean();
        return cubes;
    } catch {
        console.error('Problem with all Cubes DB');
        throw new Error();
    }
};

let saveCube = (cube) => {
    let newOne = new Cube(cube);
    newOne.save((err) => {
        if (err) {
            console.error(err);
        }

        return console.log('Congrats! New cube was made!');
    });
};

let getSingleCube = async (id) => {

    let searchedCube = await Cube.findById(id).lean()
    return searchedCube;
};

module.exports = {
    getAllCubes,
    getSingleCube,
    saveCube,
};