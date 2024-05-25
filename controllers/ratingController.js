import { Cars } from "../models/car.js"
import { Reservations } from "../models/reservation.js"
import { UserController } from "./userController.js"

export class RatingController {
  
  static async addRating(body) {
    await Reservations.addRating(body.rentalId, parseInt(body.rating), body.comment)
  }

  static async getRentals(category, city) {
    const rentals = await Reservations.getRentals(category, city)

    for (let rental of rentals){
      rental.car = await Cars.getCarByPlate(rental.carPlate)
      rental.user = await UserController.getUserDetails(rental.user)
      rental.rating.days = Math.floor( ( new Date() - rental.rating.date ) / ( 24 * 60 * 60e3 ) )
    }

    return rentals
  }

}
