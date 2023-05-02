import { Router } from "express"
import { PostType } from "../models/Post"
import { ContentType } from "../models/Content"
import { TagType } from "../models/Tag"
import { getAgg } from "../utils/utils"
import database from "../config/database"

async function createTables(postId: number, body: any): Promise<void | any> {
  const {language, markdown, title, tags} = body
  const contents = { language, title, markdown, postId }
  
  tags.map((tag: any) => tag.postId = postId)

  try {  
    await database<TagType>("tags").insert(tags)
    await database<ContentType>("contents").insert(contents)
  } catch (err) {throw err}

  return Promise.resolve()
}


const router = Router()

router.post("/", async (req, res) => {
  const { devId, password } = req.body

  if(password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  await database<PostType>("posts")
    .insert({devId})
    .then(async data => 
      await createTables(data[0], req.body)
        .then(() => res.status(200).send("Post created"))
        .catch(err => res.status(400).json(err)) 
    ).catch(err => res.status(400).json(err))
})

router.get("/:language", async (req, res) => {
  const tag = '"id", tags.id, "name", tags.name'
  const tags = getAgg("tags", tag)

  const content = '"title", contents.title'
  const contents = getAgg("contents", content)

  await database<PostType>("posts")
    .select("date", "posts.id as id", tags, contents)
    .join("tags", "posts.id", "tags.postId")
    .join("contents", "posts.id", "contents.postId")
    .where({"contents.language": req.params.language})
    .groupBy("posts.id")
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err))
})

router.get("/:language/:postId", async (req, res) => {
  const {language, postId} = req.params

  const tag = '"id", tags.id, "name", tags.name'
  const tags = getAgg("tags", tag)

  const content = '"title", contents.title, "markdown", contents.markdown'
  const contents = getAgg("contents", content)

  const dev = '"name", devs.name, "description", devs.description'
  const devs = getAgg("devs", dev)

  const where = {"contents.language": language, "posts.id": postId}

  await database<PostType>("posts")
    .select("date", "posts.id as id", tags, contents, devs)
    .join("tags", "posts.id", "tags.postId")
    .join("contents", "posts.id", "contents.postId")
    .join("devs", "devId", "devs.id")
    .where(where)
    .groupBy("posts.id")
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err))
})

export default router