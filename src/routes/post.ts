import { Router } from "express"
import { PostType } from "../models/Post"
import { ContentType } from "../models/Content"
import { TagType } from "../models/Tag"
import { getAgg } from "../utils/utils"
import database from "../config/database"

async function createTables(contents: Omit<ContentType, "id">, tags: Omit<TagType, "id">[]) : Promise<void | any> {
  try {  
    await database<ContentType>("contents").insert(contents).then(async (id: number[]) => {
      tags.map((tag: any) => tag.contentId = id[0])

      await database<TagType>("tags").insert(tags)
    })
  } catch (err) {throw err}

  return Promise.resolve()
}


const router = Router()

router.post("/", async (req, res) => {
  const { devId, password, body, tags} = req.body

  if(password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  await database<PostType>("posts")
    .insert({devId})
    .then(async data => {
      body.postId = data[0]

      await createTables(body, tags)
      .then(() => res.status(200).send("Post created"))
      .catch(err => res.status(400).json(err)) 
    }).catch(err => res.status(400).json(err))
})

router.get("/:language", async (req, res) => {
  const tag = '"id", tags.id, "name", tags.name'
  const tags = getAgg("tags", tag)

  await database<PostType>("posts")
    .select("date", "posts.id as id", tags, "contents.title as title")
    .join("contents", "posts.id", "contents.postId")
    .join("tags", "contents.id", "tags.contentId")
    .where({"contents.language": req.params.language})
    .groupBy("posts.id")
    .groupBy("contents.title")
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err))
})

router.post("/:postId", async (req, res) => {
  const { password, body, tags} = req.body

  if(password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  body.postId = +req.params.postId

  await createTables(body, tags)
    .then(() => res.status(200).send("Post created"))
    .catch(err => res.status(400).json(err)) 
})

router.get("/:language/:postId", async (req, res) => {
  const {language, postId} = req.params

  const tag = '"id", tags.id, "name", tags.name'
  const tags = getAgg("tags", tag)

  const where = {"contents.language": language, "posts.id": postId}

  await database<PostType>("posts")
    .select(
      "date", "posts.id as id", tags, 
      "contents.title as title", "contents.markdown as markdown",
      "devs.name as name", "devs.description as description"
    )
    .join("contents", "posts.id", "contents.postId")
    .join("tags", "contents.id", "tags.contentId")
    .join("devs", "devId", "devs.id")
    .where(where)
    .groupBy("posts.id")
    .groupBy("contents.title")
    .groupBy("contents.markdown")
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err))
})

export default router
