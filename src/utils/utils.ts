import { Request } from "express"

type Req<T> = Request<{}, {}, T, {}>

export type { Req }