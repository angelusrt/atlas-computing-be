const Post = require("../models/Post.js")
const Dev = require("../models/Dev.js")
const postData = require('./files/post.json')

async function addPost() {
  try{
    //Treating the data
    const user = await Dev.findById(postData.authorID)
    
    //Creating Post
    const postObj = {
      authorName: user.authorName,
      authorDescription: user.authorDescription,
      ...postData
    }

    const post = new Post(postObj)

    //Saving it
    post.save()
    console.log("Post criado com sucesso")
  } catch(err){ return err }
}

module.exports = {addPost}