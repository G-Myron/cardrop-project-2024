import { Categories } from "../models/category.js"
import { Reservations } from "../models/reservation.js"


export class ReservationController {
  static async getReservationsByUser(user) {
    const resvs = await Reservations.getReservationsByUser(user)

    for (let resv of resvs)
      resv.category = await Categories.getCategory(resv.category)

    return resvs
  }
}
