import { Request } from "express"
import { Knex } from "knex"
import database from "../config/database"
import { IdentityType, SensationType } from "../models/User"

type Req<T> = Request<{}, {}, T, {}>

type Database = Knex<any, unknown[]>
type Table = Knex.CreateTableBuilder

type IdentityOptionsType = [keyof IdentityType, [string, string, string, string], string][]
type SensationOptionsType = 
  [keyof SensationType, [string, string, string, string, string], (e: number) => string][]

const userTitles: [string, string, string, string] = [
  "Você tem o nome mais popular",
  "Você tem o segundo nome mais popular",
  "Você tem o terceiro nome mais popular",
  "O seu nome não ficou no pódio"
]

const continentTitles: [string, string, string, string] = [
  "Seu continente foi o mais popular",
  "Seu continente foi o segundo mais popular",
  "Seu continente foi o terceiro mais popular",
  "O seu continente não ficou no pódio"
]

const favAnimalTitles: [string, string, string, string] = [
  "Sua opção foi a mais popular",
  "Sua opção foi o segundo mais popular",
  "Sua opção foi o terceiro mais popular",
  "A sua opção não ficou no pódio"
]

const moodTitles: [string, string, string, string, string] = [
  "Você teve um dia ótimo",
  "Você teve um dia bom",
  "Você teve um dia normal",
  "Você teve um dia ruim",
  "Você teve um dia péssimo"
]

const globalWarmingTitles: [string, string, string, string, string] = [
  "Você gosta do clima de verão",
  "O clima nunca esteve melhor",
  "O clima podia estar pior",
  "O clima te afeta bastante",
  "Mudanças climáticas tem um peso para você",
]

const globalismTitles: [string, string, string, string, string] = [
  "Você é otimista a globalização",
  "A globalização tem seus fortes para você",
  "O globalismo tem seus momentos",
  "Você prefere as soluções locais",
  "Você é pessimista a globalização",
]

function getAgg(table: string, options: string): Knex.Raw {
  return database.raw(
    `JSON_ARRAYAGG(JSON_OBJECT(${options})) as ${table}`
  )
}

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}

export type { Req, Database, Table }
export { 
  userTitles, 
  continentTitles, 
  favAnimalTitles, 
  moodTitles, 
  globalWarmingTitles, 
  globalismTitles, 
  IdentityOptionsType,
  SensationOptionsType,
  getAgg,
  capitalize
}