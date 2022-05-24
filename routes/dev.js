import {Router as router} from "express"
import Dev from "../models/Dev"

//Gets Devs
router.get("/", async(req, res) => {
  try{
    //Gets devs
    const dev = await Dev.find()

    //Sends its
    res.json(dev)
  } catch(err){
    res.status(400).json(err)
  }
})