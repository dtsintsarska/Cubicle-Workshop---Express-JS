const express = require('express');
const router = express.Router();

const {
    getAllCubes,
    searchFunc
} = require('../controllers/cube');

router.get('/', async (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop',
        cubes: await getAllCubes(),
    });
});

router.post('/search', async (req, res) => {

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

// 404 route 

router.get('*', (req, res) => {
    res.render('404.hbs', {
        title: 'Not found',
    });
});
module.exports = router;