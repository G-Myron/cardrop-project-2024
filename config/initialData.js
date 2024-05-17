import fs from 'fs/promises'

const readFromInitFile = async (collectionName) => JSON.parse(await fs.readFile(`data/init/${collectionName}.json`))

const initUsers = await readFromInitFile('users')
const initCategories = await readFromInitFile('categories')
const initCars =  await readFromInitFile('cars')
const initReservations = await readFromInitFile('reservations')


export { initUsers, initCategories, initCars, initReservations }
