const router = require("express").Router()
const Dev = require("../models/Dev.js")

//Gets About
router.get("/", async (req, res) => {
  try {
    //Gets devs
    const dev = await Dev.find()

    //Create About Object
    const about = {
      about: `AtlasComputing se trata de um blog tão como 
        um projeto de desenvolvimento sobre programação, design, 
        tecnologia e afins. Ele foi criado com o intuito de se 
        desafiar a aprender diversos aspectos da tecnologia 
        da informação assim como de vídeo-imagem. Tem como 
        contribuintes, além de outros:`,
      dev
    }
    //Sends its
    res.json(about)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
