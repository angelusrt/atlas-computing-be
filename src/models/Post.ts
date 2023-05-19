import { Database, Table } from "../utils/types"

type PostType = {
  id: number,
  date: string,
  devId: number,
}

const postSchema = (table: Table, database: Database) => {
  table.increments("id").unsigned().primary().notNullable()
  table.timestamp("date").defaultTo(database.fn.now()).notNullable()
  table.integer("devId").unsigned().notNullable()
  table.foreign("devId").references("devs.id")
}

async function createPosts(database: Database) {
  await database.schema.hasTable("posts").then(async exists => {
    if(exists) return undefined
    
    await database.schema
      .createTable('posts', (table) => postSchema(table, database))
      .then(() => console.log("Table posts created"))
      .catch((err) => console.log("Table posts not created", err))
  })
}

export { createPosts }
export type { PostType }