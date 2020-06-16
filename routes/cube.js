const env = process.env.NODE_ENV || 'development';

const express = require('express');
const router = express.Router();
const config = require('../config/config')[env]
const jwt = require('jsonwebtoken')
const {
    checkAuth,
    openPagesCheck,
    autorAuthorization
} = require('../controllers/user')
const {
    saveCube,
    getCubeWithAccessories,
    getSingleCube,
    editCube,
    deleteCube
} = require('../controllers/cube');
const cube = require('../controllers/cube');


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

router.get('/details/:id', openPagesCheck, autorAuthorization, async (req, res) => {
    let id = req.params.id;
    let cube = await getCubeWithAccessories(id)
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube,
        accessories: cube.accessories,
        isLoggedIn: req.isLoggedIn,
        isAuthorized: req.isAuthorized
    });
});

router.get('/cube/edit/:id', checkAuth, autorAuthorization, async (req, res) => {

    if (req.isAuthorized) {
        let id = req.params.id;
        let cube = await getSingleCube(id)
        res.render('editCubePage.hbs', {
            title: 'Edit Cube | Workshop Cube',
            isLoggedIn: req.isLoggedIn,
            id,
            ...cube,
            isLoggedIn: req.isLoggedIn
        });
    } else {
        console.log('Access denied!')
        res.redirect('/404')
    }

});

router.post('/cube/edit/:id', checkAuth, autorAuthorization, async (req, res) => {

    if (req.isAuthorized) {
        let id = req.params.id
        let {
            name,
            description,
            imageUrl,
            difficultyLevel
        } = req.body;

        await editCube(id, {
            name,
            description,
            imageUrl,
            difficultyLevel
        })
        res.redirect('/')
    } else {
        console.log('Access denied!')
        res.redirect('/404')
    }
})

router.get('/cube/delete/:id', checkAuth, autorAuthorization, async (req, res) => {
    if (req.isAuthorized) {
        let id = req.params.id
        let cube = await getSingleCube(id)
        res.render('deleteCubePage.hbs', {
            title: 'Delete Cube | Workshop Cube',
            isLoggedIn: req.isLoggedIn,
            id,
            ...cube,
        })
    } else {
        console.log('Access denied!')
        res.redirect('/404')
    }

});

router.post('/cube/delete/:id', checkAuth, autorAuthorization, async (req, res) => {

    if (req.isAuthorized) {
        let id = req.params.id
        await deleteCube(id)
        res.redirect('/')
    } else {
        console.log('Access denied!')
        res.redirect('/404')
    }
})

module.exports = router;