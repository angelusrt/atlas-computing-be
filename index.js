//Imports 
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import dev from "./routes/dev"
import post from "./routes/post"

import {addDev} from "./functions/devfunc"
import {addPost} from "./functions/postfunc"

//initiate express
const app = express()

//Get enviroment variable
dotenv.config()

//Connect to the database
mongoose.connect(
  process.env.DB_CONNECT, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  },
  () => console.log("connected to db")
)
//Admin Functions
//addDev
//addPost

//Route Middleware
app.use(express.json())
app.use(cors())
app.use("/api/dev", dev)
app.use("/api/post", post)

//Response
app.get("/", (req, res) => {
  res.send("We are on home")
})

//Initiate server
app.listen(process.env.PORT)