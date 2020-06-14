const env = process.env.NODE_ENV || 'development';

const express = require('express');
const router = express.Router();
const config = require('../config/config')[env]
const jwt = require('jsonwebtoken')
const {
    checkAuth
} = require('../controllers/user')
const {
    getAllCubes,
    getSingleCube,
    saveCube,
    updateCube,
    getCubeWithAccessories,
} = require('../controllers/cube');


router.get('/create', checkAuth, (req, res) => {
    res.render('create.hbs', {
        title: 'Create New Cube',
    });
});

router.post('/create', checkAuth, async (req, res) => {
    let {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    let token = req.cookies['aid']
    let creator = jwt.verify(token, config.privateKey)
    let creatorId = creator.userId

    let cube = {
        name,
        description,
        imageUrl,
        difficultyLevel,
        creatorId
    };
    await saveCube(cube);
    res.redirect('/');
});

router.get('/details/:id', checkAuth, async (req, res) => {
    let id = req.params.id;
    let cube = await getCubeWithAccessories(id)
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube,
        accessories: cube.accessories
    });
});

router.get('/cube/edit/:id', (req, res) => {
    res.render('editCubePage.hbs', {
        title: 'Edit Cube | Workshop Cube',
    });
});

router.get('/cube/delete/:id', (req, res) => {
    res.render('deleteCubePage.hbs', {
        title: 'Delete Cube | Workshop Cube',
    });
});


module.exports = router;