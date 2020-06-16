const Cube = require('../models/cubeModel');
const mongoose = require('mongoose');

const getAllCubes = async () => {
    try {
        let cubes = await Cube.find().lean();
        return cubes;
    } catch {
        console.error('Problem with all Cubes DB');
        throw new Error();
    }
};

const saveCube = (cube) => {
    let newOne = new Cube(cube);
    newOne.save((err) => {
        if (err) {
            console.error(err);
        }

        return console.log('Congrats! New cube was made!');
    });
};

const getSingleCube = async (id) => {

    let searchedCube = await Cube.findById(id).lean()
    return searchedCube;
};

const updateCube = async (id, accessory) => {

    await Cube.findByIdAndUpdate(id, {
        $addToSet: {
            accessories: [accessory]
        }
    })
}

const getCubeWithAccessories = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean()
    return cube
}

const searchFunc = async (word, from, to) => {
    let cubes;
    if (word && from && to) {
        cubes = await Cube.find({
            name: {
                $regex: word,
                $options: 'i'
            },
            difficultyLevel: {
                $gte: from,
                $lte: to
            }
        }).lean()
    } else if (word) {
        cubes = await Cube.find({
            name: {
                $regex: word,
                $options: 'i'
            }
        }).lean()

    } else if (from && to) {
        cubes = await Cube.find({
            difficultyLevel: {
                $gte: from,
                $lte: to
            }
        }).lean()

    } else if (from || to) {
        cubes = await Cube.find({
            $or: [{
                    difficultyLevel: {
                        $gte: from
                    }
                },
                {
                    difficultyLevel: {
                        $lte: to
                    }
                }
            ]
        }).lean()
    }
    return cubes
}

const editCube = async (id, editedCube) => {
    await Cube.findByIdAndUpdate(id, editedCube, {
        new: true,
        useFindAndModify: false
    })
}

const deleteCube = async (id) => {

    await Cube.findOneAndDelete({
        _id: id
    }, {
        useFindAndModify: false
    })
}

module.exports = {
    getAllCubes,
    getSingleCube,
    saveCube,
    updateCube,
    getCubeWithAccessories,
    searchFunc,
    editCube,
    deleteCube
};