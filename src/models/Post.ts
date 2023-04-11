import { DataTypes, Model } from "sequelize"
import db from "../config/database"
import Content from "./Content"
import Tag from "./Tag"

const { DATE, INTEGER } = DataTypes

type PostReqType = {
  title: string,
  language: string,
  markdown: string,
  devId: number,
  tags: string[],
  password: string
}

class Post extends Model {
  declare date: typeof DATE
  declare id: number
  declare devId: number
}

const postAttributes = {
  id: {
    type: INTEGER.UNSIGNED,
    primaryKey: true,
    default: 0,
    autoIncrement: true
  },
  date: {
    type: DATE,
    defaultValue: Date.now,
    allowNull: false
  },
  devId: {
    type: INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'devs',
      key: 'id',
    },
  },
}

Post.init(postAttributes, { sequelize: db, tableName: "posts" })

Post.hasMany(
  Tag,
  { onDelete: "CASCADE", foreignKey: "postId", as: "tags" }
)
Post.hasMany(
  Content, 
  { onDelete: "CASCADE", foreignKey: "postId", as: "contents" }
)

export type {PostReqType}
export default Post