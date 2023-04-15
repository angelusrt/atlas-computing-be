import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import user from "./routes/user"
import dev from "./routes/dev"
import post from "./routes/post"

import https from "node:https"
import fs from "node:fs"

import database from "./config/database"

dotenv.config()

const app = express()

database.authenticate()
  .then(() => {
    console.log("database connected")
    database.sync()
  })
  .catch((err) => {
    console.error("database not found ", err)
  })

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/api/user", user)
app.use("/api/dev", dev)
app.use("/api/post", post)

app.get("/", (req, res) => res.send("We are on home"))

//app.listen(process.env.PORT)

https.createServer({
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
}, app).listen(process.env.PORT)
