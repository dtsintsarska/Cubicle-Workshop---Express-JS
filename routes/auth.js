const express = require('express');
const router = express.Router();
const {
    userValidator
} = require('../utilz/validator')
const {
    validationResult
} = require('express-validator')

const {
    registerUser,
    tokenGenerator,
    loginUser,
    openPagesCheck
} = require('../controllers/user')


//Login, register and logout routes

router.get('/register', openPagesCheck, (req, res) => {
    if (req.isLoggedIn === true) {
        return res.redirect('/')
    }
    res.render('registerPage.hbs', {
        title: 'Register | Workshop Cube',
    });
});

router.post('/register', userValidator, async (req, res) => {
    let {
        username,
        password,
        repeatPassword
    } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('registerPage.hbs', {
            message: errors.array()[0].msg,
            oldInput: req.body,
            title: 'Register | Workshop Cube',
        })
    }

    let user = await registerUser(username, password)
    let token = await tokenGenerator(user)
    res.cookie('aid', token)
    res.redirect('/')

})

router.get('/login', openPagesCheck, (req, res) => {
    if (req.isLoggedIn === true) {
        return res.redirect('/')
    }
    res.render('loginPage.hbs', {
        title: 'Login | Workshop Cube',
    });
});

router.post('/login', async (req, res) => {

    let {
        username,
        password
    } = req.body

    let [status, user] = await loginUser(username, password)

    if (!status) {
        const message = 'Wrong password or username!'
        res.render('loginPage.hbs', {
            message,
            title: 'Login | Workshop Cube'
        });
        return
    } else {
        let token = await tokenGenerator(user)
        res.cookie('aid', token)
        res.redirect('/')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('aid')

    res.redirect('/')
})

module.exports = router;