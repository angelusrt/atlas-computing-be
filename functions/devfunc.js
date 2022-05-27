const Dev = require("../models/Dev.js")
const devData = require('./files/dev.json')

function addDev() {
  try{
    const dev = new Dev(devData)

    dev.save()
    console.log("Dev criado com sucesso")
  } catch(err){ return err }
}

module.exports = {addDev}