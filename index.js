//Imports 
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

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

//Route Middleware
app.use(express.json())
app.use(cors())

//Response
app.get("/", (req, res) => {
  res.send("We are on home")
})

//Initiate server
app.listen(process.env.PORT)