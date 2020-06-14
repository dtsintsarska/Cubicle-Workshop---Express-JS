const express = require('express');
const router = express.Router();

const {
    getAllCubes,
    getSingleCube,
    saveCube,
    updateCube,
    getCubeWithAccessories,
} = require('../controllers/cube');


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
        difficultyLevel,
    };
    await saveCube(cube);
    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
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