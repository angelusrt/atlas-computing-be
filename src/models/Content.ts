import { Database, Table } from "../utils/utils"

type ContentType = {
  id: number,
  postId: number,
  title: string
  language: string,
  markdown: string,
}

const contentSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("title", 64).notNullable()
  table.string("language", 5).notNullable()
  table.text("markdown").notNullable()
  table.integer("postId").unsigned().notNullable()
  table.foreign("postId").references("posts.id")
}

async function createContents(database: Database) {
  await database.schema.hasTable("contents").then(async exists => {
    if(exists) return undefined

    await database.schema
      .createTable('contents', contentSchema)
      .then(() => console.log("Table contents created"))
      .catch((err) => console.log("Table contents not created", err))
  })
}

export type { ContentType }
export { createContents }