import { DataTypes, Model } from "sequelize"
import db from "../config/database"
import Rating from "./Rating"

const { INTEGER, ENUM, STRING } = DataTypes

type UserReqType = {
  name: string,
  favAnimal: FavAnimalEnum,
  continent: ContinentEnum,
  currentMood: MoodEnum,
  globalismOpnion: MoodEnum,
  warmingOpnion: MoodEnum
}

enum FavAnimalEnum { Dog, Cat, Lion, Wolf, Bear, Horse, Pig, Cow }
enum ContinentEnum { SouthAmerica, NorthAmerica, Europe, Asia, Oceania, Africa }
enum MoodEnum { VeryGood, Good, Normal, Bad, VeryBad }

const favAnimals = ["Dog", "Cat", "Lion", "Wolf", "Bear", "Horse", "Pig", "Cow"]
const continents = ["SouthAmerica", "NorthAmerica", "Europe", "Asia", "Oceania", "Africa"]
const moods = ["VeryGood", "Good", "Normal", "Bad", "VeryBad"]

class User extends Model {
  declare id: number
  declare name: string
  declare favAnimal: FavAnimalEnum
  declare continent: ContinentEnum
  declare currentMood: MoodEnum
  declare globalismOpnion: MoodEnum
  declare warmingOpnion: MoodEnum
  declare ratingsId: number

  public getRatings!: () => Promise<Rating[]>
}

User.init({
  id: {
    type: INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: { type: new STRING(16), allowNull: false },
  favAnimal: { type: new ENUM(...favAnimals), allowNull: false },
  continent: { type: new ENUM(...continents), allowNull: false },
  currentMood: { type: new ENUM(...moods), allowNull: false },
  globalismOpnion: { type: new ENUM(...moods), allowNull: false },
  warmingOpnion: { type: new ENUM(...moods), allowNull: false }
}, { sequelize: db, tableName: "users" })

User.hasMany(Rating, { onDelete: "CASCADE", foreignKey: "userId", as: "ratings" })

export type { UserReqType }
export default User