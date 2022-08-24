const Post = require("../models/Post.js")
const Dev = require("../models/Dev.js")

async function addPost(props) {
  try{
    let postData

    //Resolving file
    if(props[1] === "--inline"){
      postData = JSON.parse(props[2])
    } else {
      postData = require(`../files/${props}`)
    }
    
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
