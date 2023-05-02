import { Database, Table } from "../utils/utils"

enum FavAnimalEnum { Dog, Cat, Lion, Wolf, Bear, Horse, Pig, Cow }
enum ContinentEnum { SouthAmerica, NorthAmerica, Europe, Asia, Oceania, Africa }
enum MoodEnum { VeryGood, Good, Normal, Bad, VeryBad }

const favAnimals = ["Dog", "Cat", "Lion", "Wolf", "Bear", "Horse", "Pig", "Cow"]
const continents = ["SouthAmerica", "NorthAmerica", "Europe", "Asia", "Oceania", "Africa"]
const moods = ["VeryGood", "Good", "Normal", "Bad", "VeryBad"]

const favAnimalsPT = ["Cachorro", "Gato", "Leão", "Lobo", "Urso", "Cavalo", "Porco", "Vaca"]
const continentsPT = ["America do Sul", "America do Norte", "Europa", "Asia", "Oceania", "Africa"]
const moodsPT = ["Ótimo", "Bom", "Normal", "Ruim", "Péssimo"]

type UserType = {
  id: number,
  name: string,
  continent: ContinentEnum,
  favAnimal: FavAnimalEnum,
  mood: MoodEnum,
  globalWarming: MoodEnum
  globalism: MoodEnum,
}

type IdentityType = Pick<UserType, "name" | "continent" | "favAnimal">
type SensationType = Pick<UserType, "mood" | "globalWarming" | "globalism">

const userSchema = (table: Table) => {
  table.increments("id").unsigned().primary().notNullable()
  table.string("name", 16).notNullable()
  table.enum("favAnimal", favAnimals).notNullable()
  table.enum("continent", continents).notNullable()
  table.enum("mood", moods).notNullable()
  table.enum("globalism", moods).notNullable()
  table.enum("globalWarming", moods).notNullable()
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

export { 
  FavAnimalEnum,
  ContinentEnum,
  MoodEnum,
  favAnimals,
  continents,
  moods,
  favAnimalsPT,
  continentsPT,
  moodsPT,
  createUser, 
}
export type { UserType, IdentityType, SensationType }