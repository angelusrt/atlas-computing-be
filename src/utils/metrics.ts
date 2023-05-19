import client from "prom-client"
import express from "express"

const app = express()

const register = new client.Registry()
client.collectDefaultMetrics({register})

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType)

  res.send(await register.metrics())
})

app.listen(8080, () => console.log("server is running"))