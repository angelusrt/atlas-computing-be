import dotenv from "dotenv"
import { Router } from "express"

import { Req } from "../utils/utils"
import User, { UserReqType } from "../models/User"

dotenv.config()

const router = Router()

router.post("/", async (req: Req<UserReqType>, res) => {
  const { 
    name, favAnimal, continent, currentMood, globalismOpnion, warmingOpnion
  } = req.body

  const userOptions = { 
    name, favAnimal, continent, currentMood, globalismOpnion, warmingOpnion 
  }  

  await User.create(userOptions)
    .then(() => res.status(200).send("User created"))
    .catch(err => res.status(400).json(err).send("User not created"))
})

export default router