import fs from 'fs/promises'

const readFromInitFile = async (collectionName) => JSON.parse(await fs.readFile(`data/init/${collectionName}.json`))

const initUsers = await readFromInitFile('mockaroo/users')
const initCategories = await readFromInitFile('categories')
const initCars =  await readFromInitFile('mockaroo/cars')
const initReservations = await readFromInitFile('mockaroo/reservations')


export { initUsers, initCategories, initCars, initReservations }
