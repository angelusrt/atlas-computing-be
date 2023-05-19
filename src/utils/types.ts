import { Request } from "express"
import { Knex } from "knex"
import { UserType } from "../models/User"

type Req<T> = Request<{}, {}, T, {}>

type Database = Knex<any, unknown[]>
type Table = Knex.CreateTableBuilder

type ResultType = { 
  header: {title: string, subtitle: string},
  body: {text: string, quantity: number}[]
}

type AnalysisType = {
  user: UserType,
  result: ResultType,
  quantity: number,
  index: 0 | 1 | 2
  lang: "pt" | "en",
}

export type {
  Req, 
  Database,
  Table,
  ResultType,
  AnalysisType
}