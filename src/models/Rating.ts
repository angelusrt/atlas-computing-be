import { DataTypes, Model } from "sequelize"
import db from "../config/database"

const { INTEGER, ENUM } = DataTypes

enum RateEnum { Cool, Heart, Apathetic, Hate }
enum sectionEnum { Intro, Atention, Criation, Comparison, Structuring }

const rates = ["Cool", "Heart", "Apathetic", "Hate"]
const sections = ["Intro", "Atention", "Criation", "Comparison", "Structuring"]

class Rating extends Model {
  declare id: number
  declare userId: number
  declare rate: RateEnum
  declare section: sectionEnum
}

Rating.init({
  id: {
    type: INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  rate: { type: ENUM(...rates), allowNull: false },
  section: { type: ENUM(...sections), allowNull: false }
}, { sequelize: db, tableName: "ratings" })

export default Rating