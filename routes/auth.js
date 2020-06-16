const express = require('express');
const router = express.Router();

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

router.post('/register', async (req, res) => {
    let {
        username,
        password,
        repeatPassword
    } = req.body

    if (password !== repeatPassword) {
        // alert('Password and Repeated Password should be same!')
        res.redirect('/register')
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
        res.redirect('/login')
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