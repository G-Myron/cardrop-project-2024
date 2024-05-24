import { Cars } from "../models/car.js"
import { Reservations } from "../models/reservation.js"
import { Users } from "../models/user.js"
import bcrypt from 'bcrypt'

export class AdminController {

  // Users
  static async getAllUsers(limit=0, skip=0) {
    const users = await Users.getAllUsers(limit, skip)
    return users
  }
  static async countUsers() {
    return await Users.countUsers()
  }
  static async updateUser(body) {
    const userDto = {
      name: body.name,
      surname: body.surname,
      tel: body.tel,
      email: body.email
    }
    if (body.password)
      userDto.password = await bcrypt.hash(body.password, 10)
    
    return await Users.updateUser(userDto)
  }
  static async deleteUser(userEmail) {
    return await Users.deleteUser(userEmail)
  }

  // Cars
  static async getAllCars(limit=0, skip=0) {
    const cars = await Cars.getAllCars(limit, skip)
    return cars
  }
  static async countCars() {
    return await Cars.countCars()
  }
  static async updateCar(body) {
    const carDto = {
      plate: body.plate,
      make: body.make,
      model: body.model,
      category: body.category,
      location: body.location
    }
    return await Cars.updateCar(carDto)
  }
  static async deleteCar(carPlate) {
    return await Cars.deleteCar(carPlate)
  }

  // Reservations
  static async getAllReservations(userEmail, limit=0, skip=0) {
    const resvs = userEmail? await Reservations.getAllReservationsByUser(userEmail, limit, skip)
        : await Reservations.getAllReservations(limit, skip)
    return resvs
  }
  static async countReservations(userEmail) {
    const count = userEmail? await Reservations.countReservationsByUser(userEmail)
        : await Reservations.countReservations()
    return count
  }
  static async updateReservation(body) {
    const reservationDto = {
      user: body.user,
      dateFrom: new Date(body.dateFrom),
      dateTo: new Date(body.dateTo),
      category: body.category,
      location: body.location,
      canceled: body.canceled === "true",
      carPlate: body.carPlate.replaceAll(' ', '')? body.carPlate: null
    }
    return await Reservations.updateReservation(reservationDto, body.reservationId)
  }
  static async deleteReservation(resvId) {
    return await Reservations.deleteReservation(resvId)
  }

}
