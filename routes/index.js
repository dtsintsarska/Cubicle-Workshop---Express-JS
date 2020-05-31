const express = require('express');
const router = express.Router();

let {
    getAllCubes,
    getSingleCube
} = require('../controllers/database')

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