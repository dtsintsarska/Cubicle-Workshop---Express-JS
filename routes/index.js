const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Home | Cube Workshop'
    });
});

router.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About | Cube Workshop"
    })
})

router.get('/create', (req, res) => {
    res.render('create.hbs', {
        title: "Create New Cube"
    })
})

router.get('/details/:id', (req, res) => {
    res.render('details.hbs', {
        title: "Details | Cube Workshop"
    })
})
router.get('*', (req, res) => {
    res.render('404.hbs', {
        title: "Not found"
    })
})
module.exports = router;