import { Database, Table } from "../utils/types"

type DevType = {
  id: number,
  name: string,
  description: string,
  email: string,
  telephone: string,
}

const devSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("name", 32).notNullable().unique()
  table.string("description", 64).notNullable()
  table.string("email", 32).notNullable()
  table.string("telephone", 16).notNullable()
}

async function createDevs(database: Database) {
  await database.schema.hasTable("devs").then(async exists => {
    if(exists) return undefined
    
    await database.schema
      .createTable('devs', devSchema)
      .then(() => console.log("Table devs created"))
      .catch((err) => console.log("Table devs not created", err))
  })
}

export { createDevs }
export type { DevType }