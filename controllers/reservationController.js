import { Categories } from "../models/category.js"
import { Reservations } from "../models/reservation.js"


export class ReservationController {

  static async getReservationsByUser(user, daysCount) {
    const resvs = await Reservations.getReservationsByUser(user)

    for (let resv of resvs){
      resv.days = this.getDays( resv.dateFrom, resv.dateTo)
      resv.category = await Categories.getCategory(resv.category, resv.days)
    }

    return resvs
  }

  static async saveReservation(userEmail, category, city, dateFrom, dateTo) {
    const reservationDto = {
      user: userEmail,
      location: city,
      dateFrom: dateFrom,
      dateTo: dateTo,
      category: category,
      carPlate: null,
      rating: {},
    }
    await Reservations.createReservation(reservationDto)
  }

  static async deleteReservation(reservationId) {
    await Reservations.deleteReservation(reservationId)
  }

  static getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }
}
