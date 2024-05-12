import bcrypt from 'bcrypt'

const defaultPassword = await bcrypt.hash('ok', 10)
const initUsers = [
  { name: 'Myron', email: 'myron@gmail.com', password: defaultPassword },
  { name: 'Myron', email: 'gmyron1@gmail.com', password: defaultPassword},
  { name: 'John', email: 'a@a.uk', password: defaultPassword },
  { name: 'John', email: 'test@email.com', password: defaultPassword },
  { name: 'Maria', email: 'a@a', password: defaultPassword },
]


export { initUsers }
