const Dev = require("../models/Dev.js")

function addDev(props) {
  try{
    let devData

    //Resolving file directory
    if(props[1] === "--inline"){
      devData = props[2]
    } else {
      devData = require(`../files/${props}`)
    }

    //Creating Dev
    const dev = new Dev(devData)

    //Saving it
    dev.save()
    console.log("Dev criado com sucesso")
  } catch(err){ console.log(err) }
}

module.exports = {addDev}