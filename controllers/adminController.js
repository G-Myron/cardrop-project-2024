import { Cars } from "../models/car.js"
import { Reservations } from "../models/reservation.js"
import { Users } from "../models/user.js"

export class AdminController {
  static async getAllUsers(limit=0, skip=0) {
    const users = await Users.getAllUsers(limit, skip)
    return users
  }
  static async countUsers() {
    return await Users.countUsers()
  }

  static async getAllCars(limit=0, skip=0) {
    const cars = await Cars.getAllCars(limit, skip)
    return cars
  }
  static async countCars() {
    return await Cars.countCars()
  }

  static async getAllReservations(limit=0, skip=0) {
    const resvs = await Reservations.getAllReservations(limit, skip)
    return resvs
  }
  static async countReservations() {
    return await Reservations.countReservations()
  }

}
