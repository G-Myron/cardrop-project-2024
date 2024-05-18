import { Reservations } from "../models/reservation.js"


export class ReservationController {
  static async getReservationsByUser(user) {
    return await Reservations.getReservationsByUser(user)
  }
}
