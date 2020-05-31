const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');

let dbPath = path.join(__dirname, '..', 'config/database.json');

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
    };

    fs.readFile(dbPath, (err, data) => {
      if (err) {
        throw err;
      }

      console.log(data);
      let db = JSON.parse(data);
      db.push(newCube);

      fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
          throw err;
        }
        console.log('Congrats! We have new Cube!');
      });
    });
  }
}

module.exports = Cube;
