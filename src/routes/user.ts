import { Router } from "express"
import { userTypes, UserType } from "../models/User"
import { capitalize, findIndex, reduceSum } from "../utils/utils"
import { AnalysisType, ResultType } from "../utils/types"
import database from "../config/database"
import data from "../data/data"

const User = () => database<UserType>("users")
const router = Router()

router.post("/", async (req, res) => {
  const { name, favAnimal, continent, mood, globalism, globalWarming } = req.body
  const nameTrimmed = name.split(" ")[0].toLowerCase()

  await User()
    .insert({ name: nameTrimmed, favAnimal, continent, mood, globalism, globalWarming })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(400).json(err))
})

router.get("/", async (req, res) => {
  await User().select("*")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(400).json(err))
})

router.get("/analytics/:userId/:language", async (req, res) => {
  try {
    const id: number = +req.params.userId
    const lang: string = req.params.language
    if(lang !== "pt" && lang !== "en") throw new Error("Language invalid")

    let user: UserType = null!
    await User().where({id}).then(e => user = e[0])
    if (user === null) throw new Error("User is null")
    
    let quantity: string | number = ''
    await User().count().then(e => quantity = e[0]['count(*)'])
    if (typeof quantity === 'string') throw new Error("Quantity is not a number")

    let results: ResultType[] = []
    for (let index = 0 as const; index < 3; index++) {
      const resultId = results[index] = { body: [], header: { title: '', subtitle: '' } }
      const resultSense = results[index + 3] = { body: [], header: { title: '', subtitle: '' } }

      await getIdentityAnalysis({ user, quantity, result: resultId, lang, index })
      await getSensationAnalysis({ user, quantity, result: resultSense, lang, index })
    }

    res.status(200).json({ quantity, results })
  } catch (err) { res.status(400).json(err) }
})


async function getIdentityAnalysis({ result, quantity, user, lang, index }: AnalysisType) {
  const {prop, helper, types, titles} = data[lang].identity[index]
  
  async function getAnalysis(rows: any[]) {
    let userIndex: number = 3

    rows.forEach((row, i) => {
      if(row[prop] === user[prop]) userIndex = i
      
      result.body.push({ 
        text: index === 0 ? 
          capitalize(row[prop]) : types[findIndex(userTypes[index], row[prop])],
        quantity: row.quantity 
      })
    })

    result.body.push({ text: 'Outros', quantity: quantity - reduceSum(rows)})
    result.header.title = titles[userIndex]
    
    const userSubtitle: string = index === 0 ? 
      capitalize(''+user[prop]): types[findIndex(userTypes[index], ''+user[prop])]

    result.header.subtitle = `'${userSubtitle}' ${helper[0]} ${userIndex + 1}${helper[1]}.`
  }

  await User().select(prop, database.raw('count(*) as quantity'))
    .groupBy(prop).orderBy('quantity', 'desc').limit(3).then(getAnalysis)
}

async function getSensationAnalysis({ result, quantity, user, lang, index }: AnalysisType) {
  const {prop, titles, types, helper} = data[lang].sensation[index]
    
  async function getAnalysis(rows: any[]){
    let userIndex: number = 0

    rows.forEach((row, i) => {
      if (row[prop] === user[prop]) userIndex = row.quantity

      result.body.push({ 
        text: types[findIndex(userTypes[3], prop)],
        quantity: row.quantity 
      })
    })

    const percentage = Math.floor(userIndex / quantity * 100)
    result.header.title = titles[findIndex(userTypes[3], '' + user[prop])]
    result.header.subtitle = helper[0] + percentage + helper[1]
  }

  await User().select(prop, database.raw('count(*) as quantity'))
    .groupBy(prop).orderBy('quantity', 'desc').then(getAnalysis)
}

export default router