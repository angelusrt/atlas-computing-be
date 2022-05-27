const router = require("express").Router()
const Post = require("../models/Post.js")

//Gets Post
router.get("/:postID", async(req, res) => {
  try{
    //Gets post
    const post = await Post.findById(req.params.postID)

    //Sends its
    res.json(post)
  } catch(err){
    res.status(400).json(err)
  }
})

module.exports = router