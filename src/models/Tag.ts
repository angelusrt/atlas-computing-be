import { DataTypes, Model } from "sequelize"
import db from "../config/database"

const { INTEGER, STRING } = DataTypes

class Tag extends Model {
  declare id: number
  declare name: string
  declare postId: number
}

const tagAttributes = {
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
      model: "posts",
      key: 'id',
    },
  },
  name: { type: new STRING(16), allowNull: false }
}

Tag.init(
  tagAttributes, 
  { sequelize: db, tableName: "tags", timestamps: false }
)

export default Tag
