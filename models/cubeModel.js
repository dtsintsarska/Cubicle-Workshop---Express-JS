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
});

module.exports = mongoose.model('Cube', CubeSchema);