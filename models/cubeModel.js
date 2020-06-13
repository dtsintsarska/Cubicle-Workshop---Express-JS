const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 250,
  },
  imageUrl: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: Number,
    min: 1,
    max: 6,
    required: true,
  },
  accessories: [{
    type: 'ObjectId',
    ref: 'Accessory',
  }, ],
  creatorId: {
    type: 'ObjectId',
    ref: 'User',
    type: String,
    required: true
  }
});

CubeSchema.path('imageUrl').validate(function (url) {
  return url.startsWith('http') || url.startsWith('https')
}, 'Image url should starts with http/https')

module.exports = mongoose.model('Cube', CubeSchema);