const express = require('express');
const router = express.Router();
const {
    checkAuth
} = require('../controllers/user')

const {
    saveAccessory,
    getAllAccessories
} = require('../controllers/accessory')
const {
    getSingleCube,
    updateCube,
} = require('../controllers/cube');


//Accessory routes

router.get('/create/accessory', checkAuth, (req, res) => {
    res.render('createAccessory.hbs', {
        title: 'Create Accessory | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create/accessory', checkAuth, async (req, res) => {
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

router.get('/attach/accessory/:id', checkAuth, async (req, res) => {
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
        isNotEverythingAttached,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', checkAuth, async (req, res) => {
    let cubeId = req.params.id
    const {
        accessory
    } = req.body

    await updateCube(cubeId, accessory)
    res.redirect(`/details/${req.params.id}`)
})

module.exports = router;