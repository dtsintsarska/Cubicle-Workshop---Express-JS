const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const mongoose = require('mongoose')

const routerIndex = require('./routes')
const app = express()

mongoose.connect(config.DB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.error(err)
        throw new Error('Not connected to DB')
    }

    console.log('Successfully connect to DB!')
})

require('./config/express')(app);
app.use('/', routerIndex)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));