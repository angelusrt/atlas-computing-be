import { Router } from "express"
import { ContinentEnum, continents, continentsPT, FavAnimalEnum, favAnimals, favAnimalsPT, IdentityType, moods, moodsPT, SensationType, UserType } from "../models/User"
import database from "../config/database"
import { capitalize, continentTitles, favAnimalTitles, globalismTitles, globalWarmingTitles, moodTitles, userTitles } from "../utils/utils"

type AnalysisType = {
  data: DataDataType[],
  quantity: number,
  user: UserType,
  index: 0 | 1 | 2
}

async function getIdentityAnalysis(prop: AnalysisType) {
  const { data, quantity, index, user } = prop

  const dics = [continents, favAnimals]
  const select: (keyof IdentityType)[] = ["name", "continent", "favAnimal"]
  const titles = [userTitles, continentTitles, favAnimalTitles]
  const subtitles = ["a posição", "o lugar", "o lugar"]
  const ptDic = [continentsPT, favAnimalsPT]

  await database<UserType>("users")
    .select(select[index], database.raw('count(*) as quantity'))
    .groupBy(select[index]).orderBy('quantity', 'desc').limit(3)
    .then(async (rows: any[]) => {
      data[index] = { body: [], header: { title: '', subtitle: '' } }

      const userProperty = user[select[index]]

      let userIndex: number = 3

      rows.forEach((row, i) => {
        const property: string = row[select[index]]

        let propertyTranslated: string = ' '

        if(index === 0)
          propertyTranslated = capitalize(property)
        else if(index === 1)
          propertyTranslated = continentsPT[continents.findIndex(e => e === property)]
        else if(index === 2)
          propertyTranslated = favAnimalsPT[favAnimals.findIndex(e => e === property)]
          
        if (property === userProperty) userIndex = i
        data[index].body.push({ text: propertyTranslated, quantity: row.quantity })
      })

      const sum: number = rows.reduce((acc, row) => acc + row.quantity, 0)
      data[index].body.push({ text: 'Outros', quantity: quantity - sum })

      data[index].header.title = titles[index][userIndex]
      
      let userSubtitle: string = ' '

      if(index === 0)
        userSubtitle = capitalize(userProperty as string)
      else if(index === 1)
        userSubtitle = continentsPT[continents.findIndex(e => e === userProperty)]
      else if(index === 2)
        userSubtitle = favAnimalsPT[favAnimals.findIndex(e => e === userProperty)]

      data[index].header.subtitle = `'${userSubtitle}' ficou em ${userIndex + 1}${subtitles[index]}.`

    }).catch(err => { throw err })
}

async function getSensationAnalysis(prop: AnalysisType) {
  const { data, quantity, user, index } = prop

  const select: (keyof SensationType)[] = ["mood", "globalWarming", "globalism"]
  const titles = [moodTitles, globalWarmingTitles, globalismTitles]
  const subtitles = [
    (e: number) => `E ficou junto a ${e}% das pessoas.`,
    (e: number) => `E ${e}% das pessoas concordam.`,
    (e: number) => `Assim como ${e}% dos avaliados.`
  ]

  await database<UserType>("users")
    .select(select[index], database.raw('count(*) as quantity'))
    .groupBy(select[index]).orderBy('quantity', 'desc')
    .then(async (rows: any[]) => {
      data[index + 3] = { body: [], header: { title: '', subtitle: '' } }

      const userProperty = user[select[index]]
      const userIndex: number = moods.findIndex(s => s === '' + userProperty)
      let userQuantity: number = 0

      rows.forEach((row, i) => {
        const property = row[select[index]]
        const propertyTranslated = moodsPT[moods.findIndex(e => e === property)]

        if (userProperty === property) userQuantity = row.quantity
        data[index + 3].body.push({ text: propertyTranslated, quantity: row.quantity })
      })

      data[index + 3].header.title = titles[index][userIndex]
      data[index + 3].header.subtitle = subtitles[index](Math.floor(userQuantity / quantity * 100))
    }).catch(err => { throw err })
}

const router = Router()

router.post("/", async (req, res) => {
  const { name, favAnimal, continent, mood, globalism, globalWarming } = req.body
  const nameTrimmed = name.split(" ")[0].toLowerCase()

  await database<UserType>("users")
    .insert({ name: nameTrimmed, favAnimal, continent, mood, globalism, globalWarming })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(400).json(err))
})

router.get("/", async (req, res) => {
  await database<UserType>("users")
    .select("*")
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(400).json(err))
})

type HeaderDataType = { title: string, subtitle: string }
type BodyDataType = { text: string, quantity: number }
type DataDataType = { header: HeaderDataType, body: BodyDataType[] }

type DataType = {
  quantity: number,
  data: DataDataType[]
}

router.get("/analytics/:userId/:language", async (req, res) => {
  try {
    let quantity: string | number = ''
    let data: DataType = { quantity: 0, data: [] }
    let user: UserType

    await database<UserType>("users").where({ id: +req.params.userId })
      .then(res => user = res[0])
      .catch(err => res.status(400).json(err))

    if (user! === undefined) throw new Error("User is undefined")

    await database<UserType>("users").count()
      .then(result => quantity = result[0]['count(*)'])
      .catch(err => res.status(400).json(err))

    if (typeof quantity === 'string') throw new Error("Quantity is not a number")

    data.quantity = quantity

    await getIdentityAnalysis({ user, quantity, data: data.data, index: 0 })
    await getIdentityAnalysis({ user, quantity, data: data.data, index: 1 })
    await getIdentityAnalysis({ user, quantity, data: data.data, index: 2 })
    await getSensationAnalysis({ user, quantity, data: data.data, index: 0 })
    await getSensationAnalysis({ user, quantity, data: data.data, index: 1 })
    await getSensationAnalysis({ user, quantity, data: data.data, index: 2 })

    res.status(200).json(data)
  } catch (err) { res.status(400).json(err) }
})

export default router