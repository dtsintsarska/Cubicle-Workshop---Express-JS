const express = require('express');
const router = express.Router();

const {
    getAllCubes,
    getSingleCube,
    saveCube
} = require('../controllers/database')

const Cube = require('../models/cubeModel')

router.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop',
        cubes: getAllCubes()
    });
});

router.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About | Cube Workshop',
    });
});

router.get('/create', (req, res) => {
    res.render('create.hbs', {
        title: 'Create New Cube',
    });
});

router.post('/create', (req, res) => {

    let {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    let cube = new Cube(name, description, imageUrl, difficultyLevel)

    cube.save()
    res.redirect('/')

});

router.get('/details/:id', (req, res) => {
    let id = req.params.id
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube: getSingleCube(id)
    });
});
router.get('*', (req, res) => {
    res.render('404.hbs', {
        title: 'Not found',
    });
});
module.exports = router;