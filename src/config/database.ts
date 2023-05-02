import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

const database = knex({
  client: "mysql2",
  connection: {
    user: "root",
    host: "127.0.0.1",
    database: process.env.DATABASE,
    port: 3306,
    password: process.env.PASSWORD
  }
})

export default database