const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')


module.exports = (app) => {
    //TODO: Setup the view engine

    app.engine(
        '.hbs',
        handlebars({
            extname: '.hbs',
        })
    );
    app.set('view engine', '.hbs');

    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(express.json());
    app.use(cookieParser())

    //TODO: Setup the static files

    app.use('/static', express.static('static'));
};