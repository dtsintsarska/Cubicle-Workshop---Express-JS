const express = require('express');
const router = express.Router();


//Login, register and logout routes

router.get('/register', (req, res) => {
    res.render('registerPage.hbs', {
        title: 'Register | Workshop Cube',
    });
});

router.get('/login', (req, res) => {
    res.render('loginPage.hbs', {
        title: 'Login | Workshop Cube',
    });
});


module.exports = router;