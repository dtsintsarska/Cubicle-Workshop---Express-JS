const env = process.env.NODE_ENV || 'development';

const express = require('express');
const router = express.Router();
const config = require('../config/config')[env]
const jwt = require('jsonwebtoken')
const {
    checkAuth,
    openPagesCheck
} = require('../controllers/user')
const {
    saveCube,
    getCubeWithAccessories,
} = require('../controllers/cube');


router.get('/create', checkAuth, (req, res) => {
    res.render('create.hbs', {
        title: 'Create New Cube',
        isLoggedIn: req.isLoggedIn
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

router.get('/details/:id', openPagesCheck, async (req, res) => {
    let id = req.params.id;
    let cube = await getCubeWithAccessories(id)
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube,
        accessories: cube.accessories,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/cube/edit/:id', checkAuth, (req, res) => {
    res.render('editCubePage.hbs', {
        title: 'Edit Cube | Workshop Cube',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/cube/delete/:id', checkAuth, (req, res) => {
    res.render('deleteCubePage.hbs', {
        title: 'Delete Cube | Workshop Cube',
        isLoggedIn: req.isLoggedIn
    });
});


module.exports = router;