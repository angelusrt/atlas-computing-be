import { DataTypes, Model } from "sequelize"
import db from "../config/database"

const { INTEGER, STRING } = DataTypes

class Social extends Model {
  declare id: number
  declare name: string
  declare link: string
  declare devId: number
}

const socialAttributes = {
  id: {
    primaryKey: true,
    default: 0,
    type: INTEGER.UNSIGNED,
    autoIncrement: true
  },
  devId: {
    type: INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'devs',
      key: 'id',
    },
  },
  name: { type: new STRING(16), allowNull: false },
  link: { type: new STRING(64), allowNull: false },
}

Social.init(
  socialAttributes, 
  { sequelize: db, tableName: "socials", timestamps: false }
)

export default Social
