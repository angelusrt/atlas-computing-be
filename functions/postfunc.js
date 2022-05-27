import Post from "../models/Post"
import Dev from "../models/Dev"

import postData from './files/post.json' /*assert {type: "json"}*/

function addPost() {
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

export {addPost}