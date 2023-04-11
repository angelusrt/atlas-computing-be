import { DataTypes, Model } from "sequelize"
import db from "../config/database"
import Post from "./Post"
import Social from "./Social"

const { INTEGER, STRING } = DataTypes

type DevReqType = {
  name: string,
  description: string,
  email: string,
  telephone: string,
  socials: { name: string, icon: string, link: string }[],
  password: string
}

class Dev extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare email: string
  declare telephone: string

  public getPosts!: () => Promise<Post[]>
  public getSocials!: () => Promise<Social[]>
}

const devAttributes = {
  id: {
    primaryKey: true,
    type: INTEGER.UNSIGNED,
    default: 0,
    autoIncrement: true
  },
  name: { type: new STRING(32), allowNull: false, unique: true },
  description: { type: new STRING(64), allowNull: false },
  email: { type: new STRING(32), allowNull: false },
  telephone: { type: new STRING(16), allowNull: false },
}

Dev.init(devAttributes, { sequelize: db, tableName: "devs" })

Dev.hasMany(
  Social,
  { onDelete: "CASCADE", foreignKey: "devId", as: "socials" }
)
Dev.hasMany(
  Post,
  { onDelete: "CASCADE", foreignKey: "devId", as: "posts" }
)

export type {DevReqType}
export default Dev