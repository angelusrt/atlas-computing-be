const router = require("express").Router()
const Post = require("../models/Post.js")

//Gets all Post
router.get("/", async(req, res) => {
  try{
    //Gets post
    const post = await Post.find({}, "_id tags title")

    //Sends its
    res.json(post)
  } catch(err){
    res.status(400).json(err)
  }
})

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