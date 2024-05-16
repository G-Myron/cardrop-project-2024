
const initUsers = [
  { name: 'Myron', email: 'myron@gmail.com', password: '$2b$10$NupTT/IIKmVq/8L4a4m.7ecxPeAkZQdbN.dILI8Emi91lvNuq.e3C' },
  { name: 'Myron', email: 'gmyron1@gmail.com', password: '$2b$10$NupTT/IIKmVq/8L4a4m.7ecxPeAkZQdbN.dILI8Emi91lvNuq.e3C'},
  { name: 'John', email: 'a@a.uk', password: '$2b$10$NupTT/IIKmVq/8L4a4m.7ecxPeAkZQdbN.dILI8Emi91lvNuq.e3C' },
  { name: 'John', email: 'test@email.com', password: '$2b$10$NupTT/IIKmVq/8L4a4m.7ecxPeAkZQdbN.dILI8Emi91lvNuq.e3C' },
  { name: 'Maria', email: 'a@a', password: '$2b$10$NupTT/IIKmVq/8L4a4m.7ecxPeAkZQdbN.dILI8Emi91lvNuq.e3C' },
]

const initCategories = [
  { name: 'small', like: 'Aston Martin DB12', price: 30, seats: 2, doors:3, transmition: 'Manual', bags:2 },
  { name: 'medium', like: 'Alfa Romeo Giulia', price: 50, seats: 4, doors:5, transmition: 'Semi-automatic', bags:3 },
  { name: 'large', like: 'Lamborghini Urus', price: 100, seats: 5, doors:5, transmition: 'Automatic', bags:4 },
]

const initCars = [
  { category: 'small', model: 'Aston Martin DB12', plate: 'IKP-9513', location: 'Athens'},
  { category: 'small', model: 'Hyundai i30', plate: 'AZK-5620', location: 'Patras'},
  { category: 'medium', model: 'Alfa Romeo Giulia', plate: 'NKP-1234', location: 'Thessaloniki'},
  { category: 'medium', model: 'Ford GT', plate: 'ZHN-7569', location: 'Athens'},
  { category: 'large', model: 'Lamborghini Urus', plate: 'YXB-6934', location: 'Athens'},
]

const initReservations = [
  { user: 'gmyron1@gmail.com', category: 'small', dateFrom: new Date("2024-04-15"), dateTo: new Date("2024-04-17") },
  { user: 'a@a.uk', category: 'small', dateFrom: new Date("2024-03-12"), dateTo: new Date("2024-04-01") },
  { user: 'gmyron1@gmail.com', category: 'medium', dateFrom: new Date("2024-04-29"), dateTo: new Date("2024-05-05") },
]


export { initUsers, initCategories, initCars, initReservations }
