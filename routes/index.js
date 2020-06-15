const express = require('express');
const router = express.Router();

const {
    getAllCubes,
    searchFunc
} = require('../controllers/cube');
const {
    checkAuth,
    openPagesCheck
} = require('../controllers/user');

router.get('/', openPagesCheck, async (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop',
        cubes: await getAllCubes(),
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/search', openPagesCheck, async (req, res) => {

    let {
        search,
        from,
        to
    } = req.body

    console.log('search', search, 'from', from, 'to', to)

    let cubes = await searchFunc(search, from, to)

    res.render('index.hbs', {
        title: 'Seach results | Cube Workshop',
        cubes,
        isLoggedIn: req.isLoggedIn
    })
});

router.get('/about', openPagesCheck, (req, res) => {
    res.render('about.hbs', {
        title: 'About | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

// 404 route 

router.get('*', openPagesCheck, (req, res) => {
    res.render('404.hbs', {
        title: 'Not found',
        isLoggedIn: req.isLoggedIn
    });
});
module.exports = router;