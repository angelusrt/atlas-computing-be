import { Router } from "express"
import { DevType } from "../models/Dev"
import { SocialType } from "../models/Social"
import database from "../config/database"

async function createTable(devId: number, body: any) {
  body.socials.map((social: any) => social.devId = devId)

  await database<SocialType>("socials")
    .insert(body.socials)
    .catch(err => {throw err})
}


const router = Router()

router.post("/", async (req, res) => {
  const { description, email, name, telephone, password } = req.body

  if (password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  await database<DevType>("devs")
    .insert({ name, description, email, telephone })
    .then(async data => 
      await createTable(data[0], req.body)
        .then(() => res.status(200).send("Dev created"))
        .catch(err => res.status(400).json(err))
    ).catch(err => res.status(400).json(err))
})

router.get("/", async (req, res) => {
  const social = '"id", socials.id, "name", socials.name, "link", socials.link'
  const socials = database.raw(`JSON_ARRAYAGG(JSON_OBJECT(${social})) as socials`)

  await database<DevType>("devs")
    .select("devs.name as name", "description", "email", "telephone", socials)
    .join("socials", "devs.id", "socials.devId")
    .groupBy("devs.id")
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(400).json(err))
})

export default router
