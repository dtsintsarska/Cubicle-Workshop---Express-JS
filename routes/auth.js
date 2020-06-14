const express = require('express');
const router = express.Router();

const {
    registerUser,
    tokenGenerator
} = require('../controllers/user')


//Login, register and logout routes

router.get('/register', (req, res) => {
    res.render('registerPage.hbs', {
        title: 'Register | Workshop Cube',
    });
});

router.post('/register', async (req, res) => {
    let {
        username,
        password,
        repeatPassword
    } = req.body

    if (password !== repeatPassword) {
        alert('Password and Repeated Password should be same!')
        res.redirect('/register')
    }

    let user = await registerUser(username, password)
    let token = await tokenGenerator(user)
    res.cookie('aid', token)
    res.redirect('/')

})

router.get('/login', (req, res) => {
    res.render('loginPage.hbs', {
        title: 'Login | Workshop Cube',
    });
});


module.exports = router;