//Imports 
const readline = require("readline/promises")
const {stdin, stdout} = require("process")
const path = require("path")
const https = require("https")
const fs = require("fs")

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const dev = require("./routes/dev.js")
const post = require("./routes/post.js")
const image = require("./routes/image.js")

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
  () => {
    console.log("connected to db")
    waitInput()
  }
)

//Admin Functions
async function waitInput() {
  const r1 = readline.createInterface({input: stdin,output: stdout})
  let answer = await r1.question("Esperando por inputs:\n")
  answer = [
    answer.split(" ", 2)[0], 
    answer.split(" ", 2)[1],
    answer.replace(
      answer.split(" ", 2)[0] + " " + answer.split(" ", 2)[1],
      ""
    ).slice(1)
  ]

  switch (answer[0]) {
    case "addDev":
      addDev(answer)
      console.log(`addDev ${answer[1]}\n`)
      waitInput()
      break;
    case "addPost":
      addPost(answer) //filename at /files
      console.log(`addPost ${answer[1]}\n`)
      waitInput()
      break;
    default:
      console.log("Input invalido")
      waitInput()
      break;
  }
}

//Route Middleware
app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/api/dev", dev)
app.use("/api/post", post)
app.use("/api/image", image)

//Response
app.get("/", (req, res) => {
  res.send("We are on home")
})

//Initiate server
https.createServer({
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
}, app).listen(process.env.PORT);
