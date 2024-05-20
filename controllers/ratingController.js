import { Reservations } from "../models/reservation.js"

export class RatingController {
  
  static async addRating(body) {
    await Reservations.addRating(body.rentalId, parseInt(body.rating), body.comment)
  }

  static async showRatings() {
    return await Reservations.getRatings(email, category, city)
  }


  static getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }

}
