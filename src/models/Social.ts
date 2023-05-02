import { Database, Table } from "../utils/utils"

type SocialType = {
  id: number,
  name: string,
  link: string,
  devId: string
}

const socialSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("name", 16).notNullable()
  table.string("link", 64).notNullable()
  table.integer("devId").unsigned().notNullable()
  table.foreign("devId").references("devs.id")
}

async function createSocials(database: Database) {
  await database.schema.hasTable("socials").then(async exists => {
    if(exists) return undefined

    await database.schema
      .createTable('socials', socialSchema)
      .then(() => console.log("Table socials created"))
      .catch((err) => console.log("Table socials not created", err))
  })
}

export type { SocialType }
export { createSocials }