import { Database, Table } from "../utils/types"

enum FavAnimalEnum { Dog, Cat, Lion, Wolf, Bear, Horse, Pig, Cow }
enum ContinentEnum { SouthAmerica, NorthAmerica, Europe, Asia, Oceania, Africa }
enum MoodEnum { VeryGood, Good, Normal, Bad, VeryBad }

const userTypes = [
  [""],
  ["SouthAmerica", "NorthAmerica", "Europe", "Asia", "Oceania", "Africa"],
  ["Dog", "Cat", "Lion", "Wolf", "Bear", "Horse", "Pig", "Cow"],
  ["VeryGood", "Good", "Normal", "Bad", "VeryBad"]
]

type UserType = {
  id: number,
  name: string,
  continent: ContinentEnum,
  favAnimal: FavAnimalEnum,
  mood: MoodEnum,
  globalWarming: MoodEnum
  globalism: MoodEnum,
}

const userSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("name", 16).notNullable()
  table.enum("continent", userTypes[1]).notNullable()
  table.enum("favAnimal", userTypes[2]).notNullable()
  table.enum("mood", userTypes[3]).notNullable()
  table.enum("globalism", userTypes[3]).notNullable()
  table.enum("globalWarming", userTypes[3]).notNullable()
}

async function createUser(database: Database) {
  await database.schema.hasTable("users").then(async exists => {
    if(exists) return undefined
    
    await database.schema
      .createTable('users', userSchema)
      .then(() => console.log("Table users created"))
      .catch((err) => console.log("Table users not created", err))
  })
}

export { userTypes, createUser }
export type { UserType }