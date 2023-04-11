import dotenv from "dotenv"
import { Router } from "express"

import Dev, { DevReqType } from "../models/Dev"
import Social from "../models/Social"
import { Req } from "../utils/utils"

dotenv.config()

const router = Router()

const about = `AtlasComputing se trata de um blog tão como 
  um projeto de desenvolvimento sobre programação, design, 
  tecnologia e afins. Ele foi criado com o intuito de se 
  desafiar a aprender diversos aspectos da tecnologia 
  da informação assim como de vídeo-imagem. Tem como 
  contribuintes, além de outros:`

router.post("/", async (req: Req<DevReqType>, res) => {
  const { description, email, name, telephone, password, socials } = req.body
  
  if (password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  async function createSocials(devId: number) {
    socials.map(async (e, i) => {
      const { icon, link, name } = e

      await Social.create({ icon, link, name, devId: devId})
        .catch(err => res.status(400).send("Socials not created").json(err))
    })
  }

  Dev.create({ name, description, email, telephone })
    .then(dev => createSocials(dev.id).then(() => res.status(200).send("Dev created")))
    .catch(err => res.status(400).send("Dev not created").json(err))
})

router.get("/", async (req, res) => {
  await Dev.findAll({ include: {model: Social, as: "socials", foreignKey: "devId"}})
    .then(data => res.json({ about, data }))
    .catch(err => res.status(400).json(err))
})

export default router