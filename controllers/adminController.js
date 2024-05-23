import { Cars } from "../models/car.js"
import { Reservations } from "../models/reservation.js"
import { Users } from "../models/user.js"

export class AdminController {
  static async getAllUsers() {
    const users = await Users.getAllUsers()
    return users
  }

  static async getAllCars() {
    const cars = await Cars.getAllCars()
    return cars
  }

  static async getAllReservations() {
    const resvs = await Reservations.getAllReservations()
    return resvs
  }

}
