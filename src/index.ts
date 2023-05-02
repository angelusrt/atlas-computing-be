import https from "node:https"
import fs from "node:fs"

import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import dev from "./routes/dev"
import post from "./routes/post"
import user from "./routes/user"


import { createDevs } from "./models/Dev"
import { createSocials } from "./models/Social"
import { createTags } from "./models/Tag"
import { createPosts } from "./models/Post"
import { createContents } from "./models/Content"
import { createUser } from "./models/User"
import database from "./config/database"

(async function (){
  await createDevs(database)
  await createSocials(database)

  await createPosts(database)
  await createTags(database)
  await createContents(database)

  await createUser(database)
})().then(() => {
  dotenv.config()
  
  const app = express()

  app.use(express.json())
  app.use(cors({ origin: "*" }))
  app.use("/api/dev", dev)
  app.use("/api/post", post)
  app.use("/api/user", user)

  app.get("/", (req, res) => res.send("We are on home"))

  if(!process.env.KEY || !process.env.CERT){
    app.listen(process.env.PORT)
  }
  else {
    https.createServer({
      key: fs.readFileSync(process.env.KEY),
      cert: fs.readFileSync(process.env.CERT),
    }, app).listen(process.env.PORT)
  }
})