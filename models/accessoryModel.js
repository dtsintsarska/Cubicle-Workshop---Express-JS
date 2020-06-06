const mongoose = require('mongoose')

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    imageUrl: {
        type: String,
        required: true
        // validate: {
        //     validator: value => validator.isURL(value, {
        //         protocols: ['http', 'https', 'ftp'],
        //         require_tld: true,
        //         require_protocol: true
        //     }),
        //     message: 'Must be a Valid URL'
        // }
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]

})


module.exports = mongoose.model('Accessory', AccessorySchema);