const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'config/database.json');

let getAllCubes = () => {

    let data = fs.readFileSync(dbPath)
    let cubes = JSON.parse(data)
    return (cubes)
}

let saveCube = (cube) => {

    let cubes = getAllCubes()
    cubes.push(cube)

    fs.writeFileSync(dbPath, JSON.stringify(cubes), error => {
        if (error) {
            throw error
        }
        console.log('Congrats! New cube is made!')
    })
}

let getSingleCube = (id) => {

    let cubes = getAllCubes()
    let seachedCube = cubes.filter((x => x.id === id))[0]
    return seachedCube
}



module.exports = {
    getAllCubes,
    getSingleCube,
    saveCube
}