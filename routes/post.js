import {Router as router} from "express"
import Post from "../models/Post"

//Gets Post
router.get("/post/:postID", async(req, res) => {
  try{
    //Gets post
    const post = await Post.findById(req.params.postID)

    //Sends its
    res.json(post)
  } catch(err){
    res.status(400).json(err)
  }
})