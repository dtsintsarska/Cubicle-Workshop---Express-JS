const {
    body
} = require('express-validator');

const cubeValidator = [
    body('name', 'Cube\'s name should be at least 5 symbols!').isLength({
        min: 5,
    }),
    body('name').custom((value) => {
        if (!value.match(/[a-zA-Z0-9 ]+/)) {
            throw new Error('Cube\'s name should consist only letters, digits and whitespaces');
        }
        return true;
    }),

    body(
        'description',
        'Course description should be at least 20 symbols!'
    ).isLength({
        min: 20,
    }),
    body('description').custom((value) => {
        if (!value.match(/[a-zA-Z0-9 ]+/)) {
            throw new Error('Cube\'s description should consist only letters, digits and whitespaces');
        }
        return true;
    }),


    body('imageUrl').custom((value) => {
        if (!value.match(/^http[s]?:\/\/.+/)) {
            throw new Error('ImageUrl should starts with http:// or https://!');
        }
        return true;
    }),
];

const userValidator = [
    body('username', 'Username should be at least 5 symbols!').isLength({
        min: 5,
    }),
    body(
        'username',
        'Username should consist only letters and digits!'
    ).isAlphanumeric(),

    body('password', 'Password should be at least 8 symbols!').isLength({
        min: 8,
    }),
    body(
        'password',
        'Password should consist only letters and digits!'
    ).isAlphanumeric(),

    body('repeatPassword').custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Repeat password and password should match!');
        }
        return true;
    }),
];

module.exports = {
    cubeValidator,
    userValidator,
};