const router = require("express").Router()
const Post = require("../models/Post.js")

//Gets all Post
router.get("/:lang", async(req, res) => {
  try{
    //Gets post
    const post = await Post.find({}, "_id tags content date")

    //Treats post
    const newPost = post.map(item => {
      if(
        item.content.filter(item => 
          item.language === req.params.lang
        ) !== undefined
      ){
        return {
          _id: item._id, 
          tags: item.tags, 
          date: item.date, 
          title: item.content.filter(item => 
            item.language === req.params.lang
          )[0].title
        }
      }
    }).filter(item => item != null)

    //Sends its
    res.json(newPost)
  } catch(err){
    res.status(400).json(err)
    console.log(err)
  }
})

//Gets Post
router.get("/:lang/:postID", async(req, res) => {
  try{
    //Gets post
    const post = await Post.findById(req.params.postID)

    //Treats information
    const newPost = {
      date: post.date,
      authorID: post.authorID,
      authorName: post.authorName,
      authorDescription: post.authorDescription,
      tags: post.tags,
      content: post.content.filter(item => item.language === req.params.lang)
    }
    
    //Sends its
    res.json(newPost)
  } catch(err){
    res.status(400).json(err)
  }
})

module.exports = router
