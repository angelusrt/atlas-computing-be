import { DataTypes, Model } from "sequelize"
import db from "../config/database"

const { INTEGER, STRING, TEXT } = DataTypes

class Content extends Model {
  declare id: number
  declare postId: number
  declare language: string
  declare title: string
  declare markdown: string
}

const contentAttributes = {
  id: {
    primaryKey: true,
    default: 0,
    type: INTEGER.UNSIGNED,
    autoIncrement: true
  },
  postId: {
    type: INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  language: { type: new STRING(5), allowNull: false, unique: true },
  title: { type: new STRING(64), allowNull: false },
  markdown: { 
    type: TEXT, 
    allowNull: false
  }
}

Content.init(
  contentAttributes, 
  { sequelize: db, tableName: "contents", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" }
)

export default Content
