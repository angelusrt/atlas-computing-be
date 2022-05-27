import Dev from "../models/Dev"
import devData from './dev.json' /*assert {type: "json"}*/

function addDev() {
  try{
    const dev = new Dev(devData)

    dev.save()
    console.log("Dev criado com sucesso")
  } catch(err){ return err }
}

export {addDev}