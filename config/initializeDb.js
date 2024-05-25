import { closeDb } from "../config/database.js"
import { Users } from "../models/user.js"
import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"
import { Reservations } from "../models/reservation.js"

await Users.initializeUsers().catch(console.dir)
await Cars.initializeCars().catch(console.dir)
await Reservations.initializeReservations().catch(console.dir)
await Categories.initializeCategories().catch(console.dir)

await closeDb()
