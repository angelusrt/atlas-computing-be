const Dev = require("../models/Dev.js")

function addDev(props) {
  try{
    const devData = require(props)
    const dev = new Dev(devData)

    dev.save()
    console.log("Dev criado com sucesso")
  } catch(err){ console.log(err) }
}

module.exports = {addDev}