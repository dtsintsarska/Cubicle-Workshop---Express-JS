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
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
})

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http') || url.startsWith('https')
}, 'Image url should starts with http/https')


module.exports = mongoose.model('Accessory', AccessorySchema);