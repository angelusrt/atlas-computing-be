//Imports 
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const dev = require("./routes/dev.js")
const post = require("./routes/post.js")

const {addDev} = require("./functions/devfunc.js")
const {addPost} = require("./functions/postfunc.js")

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