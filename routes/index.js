const express = require('express');
const router = express.Router();
const Cube = require('../models/cubeModel');

const {
    getAllCubes,
    getSingleCube,
    saveCube
} = require('../controllers/cube');

router.get('/', async (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop',
        cubes: await getAllCubes(),
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

router.post('/create', async (req, res) => {
    let {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    let cube = {
        name,
        description,
        imageUrl,
        difficultyLevel
    };
    await saveCube(cube);
    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    let id = req.params.id;
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube: await getSingleCube(id),
    });
});

//Accessory routes 

router.get('/create/accessory', async (req, res) => {
    res.render('createAccessory.hbs', {
        title: 'Create Accessory | Cube Workshop',
    });
});




router.get('*', (req, res) => {
    res.render('404.hbs', {
        title: 'Not found',
    });
});
module.exports = router;