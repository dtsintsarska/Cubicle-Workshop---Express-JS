const express = require('express');
const router = express.Router();
const Cube = require('../models/cubeModel');
const {
    saveAccessory,
    getAllAccessories
} = require('../controllers/accessory')
const {
    getAllCubes,
    getSingleCube,
    saveCube,
    updateCube,
    getCubeWithAccessories,
    searchFunc
} = require('../controllers/cube');

router.get('/', async (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop',
        cubes: await getAllCubes(),
    });
});

router.post('/search', async (req, res) => {
    // res.render('index.hbs', {
    //     title: 'Home | Cube Workshop',
    //     cubes: await getAllCubes(),
    // });

    let {
        search,
        from,
        to
    } = req.body

    console.log('search', search, 'from', from, 'to', to)

    let cubes = await searchFunc(search, from, to)

    res.render('index.hbs', {
        title: 'Seach results | Cube Workshop',
        cubes
    })
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
        difficultyLevel,
    };
    await saveCube(cube);
    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    let id = req.params.id;
    //let cube = await getSingleCube(id)
    let cube = await getCubeWithAccessories(id)
    console.log(cube.accessories)
    res.render('details.hbs', {
        title: 'Details | Cube Workshop',
        cube,
        accessories: cube.accessories
    });
});

//Accessory routes

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory.hbs', {
        title: 'Create Accessory | Cube Workshop',
    });
});

router.post('/create/accessory', async (req, res) => {
    let {
        name,
        imageUrl,
        description
    } = req.body;

    let accessory = {
        name,
        imageUrl,
        description
    }
    await saveAccessory(accessory)
    res.redirect('/')
});

router.get('/attach/accessory/:id', async (req, res) => {
    let id = req.params.id;
    let cube = await getSingleCube(id);
    let allAccessories = await getAllAccessories()
    let cubeAcc = cube.accessories.map((x) => x = x.toString())
    let accessories = []

    Array.from(allAccessories).forEach((x) => {
        let el = x._id.toString()
        if (!cubeAcc.includes(el)) {
            accessories.push(x)
        }
    })

    if (accessories.length > 0) {
        isNotEverythingAttached = true
    } else {
        isNotEverythingAttached = false
    }
    res.render('attachAccessory.hbs', {
        title: 'Attach Accessory | Cube Workshop',
        ...cube,
        accessories,
        isNotEverythingAttached
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    let cubeId = req.params.id
    const {
        accessory
    } = req.body

    await updateCube(cubeId, accessory)
    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) => {
    res.render('404.hbs', {
        title: 'Not found',
    });
});
module.exports = router;