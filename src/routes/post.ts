import dotenv from "dotenv"
import { Router } from "express"

import Content from "../models/Content"
import Tag from "../models/Tag"
import Post, { PostReqType } from "../models/Post"
import { Req } from "../utils/utils"

dotenv.config()

const router = Router()

router.post("/", async (req: Req<PostReqType>, res) => {
  const { devId, language, markdown, tags, title, password } = req.body

  if(password !== process.env.PASSWORD)
    res.status(401).send("not authorized")

  async function createDependencies(postId: number) {
    tags.map(async (name, i) => {
      await Tag.create({ name, postId })
        .catch(err => res.status(400).json(err).send("Tag not created"))
    })

    await Content.create({ language, title, markdown, postId })
      .catch(err => res.status(400).json(err).send("Content not created"))
  }

  await Post.create({ devId })
    .then((post) => createDependencies(post.id).then(() => res.status(200).send("Post created")))
    .catch(err => res.status(400).json(err).send("Post not created"))
})

router.get("/:lang", async (req, res) => {
  const postConfig = {
    attributes: ["id", "date"],
    include: [
      { model: Tag, as: "tags", foreignKey: "postId" },
      { 
        model: Content, as: "contents", foreignKey: "postId", 
        where: { language: req.params.lang } 
      }
    ]
  }

  await Post.findAll(postConfig)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err))
})

router.get("/:lang/:postId", async (req, res) => {
  const postConfig = {
    where: { id: req.params.postId },
    attributes: ["id", "date"],
    include: [
      { model: Tag, as: "tags", foreignKey: "postId" },
      { 
        model: Content, as: "contents", foreignKey: "postId", 
        where: { language: req.params.lang } 
      }
    ]
  }

  await Post.findOne(postConfig)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
})

export default router