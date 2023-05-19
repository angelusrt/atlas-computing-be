import { Knex } from "knex"
import database from "../config/database"

function getAgg(table: string, options: string): Knex.Raw {
  return database.raw(`JSON_ARRAYAGG(JSON_OBJECT(${options})) as ${table}`)
}

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}

function findIndex(dictionary: readonly string[], token: string): number{
  return dictionary.findIndex(e => e === token)
}

function reduceSum(rows: any[]){
  return rows.reduce((acc, row) => acc + row.quantity, 0)
}

export { 
  getAgg,
  capitalize,
  findIndex,
  reduceSum
}