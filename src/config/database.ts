import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  host: "127.0.0.1",
  database: "blog",
  port: 3306,
  password: process.env.PASSWORD
})

export default sequelize