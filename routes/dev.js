const router = require("express").Router()
const Dev = require("../models/Dev.js")

//Gets About
router.get("/", async (req, res) => {
  try {
    //Gets devs
    const dev = await Dev.find()

    //Create About Object
    const about = {
      about: `Culpa voluptate reprehenderit et 
        labore laborum non ipsum quis nisi ad id 
        est aliquip labore. Ut incididunt ea cillum 
        labore. Voluptate non incididunt adipisicing 
        velit laboris nostrud non proident voluptate qui 
        anim incididunt nisi.`,
      dev
    }
    //Sends its
    res.json(about)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router