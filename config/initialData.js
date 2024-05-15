import bcrypt from 'bcrypt'

const defaultPassword = await bcrypt.hash('ok', 10)
const initUsers = [
  { name: 'Myron', email: 'myron@gmail.com', password: defaultPassword },
  { name: 'Myron', email: 'gmyron1@gmail.com', password: defaultPassword},
  { name: 'John', email: 'a@a.uk', password: defaultPassword },
  { name: 'John', email: 'test@email.com', password: defaultPassword },
  { name: 'Maria', email: 'a@a', password: defaultPassword },
]

const initCategories = [
  { name: 'small' },
  { name: 'medium' },
  { name: 'large' },
]

const initCars = [
  { category: 'small', model: 'Alfa Romeo Giulia', plate: 'NKP-1234', location: 'Thessaloniki'},
  { category: 'small', model: 'Hyundai i30', plate: 'AZK-5620', location: 'Patras'},
  { category: 'small', model: 'Ford GT', plate: 'ZHN-7569', location: 'Athens'},
  { category: 'large', model: 'Lamborghini Urus', plate: 'YXB-6934', location: 'Athens'},
]

const initReservations = [
  { user: 'gmyron1@gmail.com', category: 'small', dateFrom: new Date("2024-04-15"), dateTo: new Date("2024-04-17") },
  { user: 'a@a.uk', category: 'small', dateFrom: new Date("2024-03-12"), dateTo: new Date("2024-04-01") },
  { user: 'gmyron1@gmail.com', category: 'medium', dateFrom: new Date("2024-04-29"), dateTo: new Date("2024-05-05") },
]


export { initUsers, initCategories, initCars, initReservations }
