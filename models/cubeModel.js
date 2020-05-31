const {
  v4
} = require('uuid');
const {
  saveCube,
  getAllCubes
} = require('../controllers/database')


class Cube {
  constructor(name, description, imageUrl, difficultyLevel) {
    this.id = v4();
    this.name = name || 'No name';
    this.description = description || 'Without description';
    this.imageUrl = imageUrl || 'placeholder';
    this.difficultyLevel = difficultyLevel || 0;
  }

  save() {
    let newCube = {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      difficultyLevel: this.difficultyLevel,
    }
  }


  saveCube(newCube)

}

module.exports = Cube;