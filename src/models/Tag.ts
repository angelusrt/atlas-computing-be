import { Database, Table } from "../utils/types"

type TagType = {
  id: number,
  name: string,
  postId: string
}

const tagSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("name", 16).notNullable()
  table.integer("postId").unsigned().notNullable()
  table.foreign("postId").references("posts.id")
}

async function createTags(database: Database) {
  await database.schema.hasTable("tags").then(async exists => {
    if(exists) return undefined

    await database.schema
      .createTable('tags', tagSchema)
      .then(() => console.log("Table tags created"))
      .catch((err) => console.log("Table tags not created", err))
  })
}

export type { TagType }
export { createTags }