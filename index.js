const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');

const routerIndex = require('./routes')
const app = express()

require('./config/express')(app);
app.use('/', routerIndex)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));