import bcrypt from 'bcrypt'

const defaultPassword = await bcrypt.hash('ok', 10)
const initUsers = [
  { name: 'Myron', email: 'myron@gmail.com', password: defaultPassword },
  { name: 'Myron', email: 'gmyron1@gmail.com', password: defaultPassword},
  { name: 'John', email: 'a@a.uk', password: defaultPassword },
  { name: 'John', email: 'test@email.com', password: defaultPassword },
  { name: 'Maria', email: 'a@a', password: defaultPassword },
]

const initCars = [
  { type: 'small', model: 'Alfa Romeo Giulia', plate: 'NKP-1234', location: 'Thessaloniki'},
  { type: 'small', model: 'Hyundai i30', plate: 'AZK-5620', location: 'Patras'},
  { type: 'small', model: 'Ford GT', plate: 'ZHN-7569', location: 'Athens'},
  { type: 'large', model: 'Lamborghini Urus', plate: 'YXB-6934', location: 'Athens'},
]


export { initUsers, initCars }
