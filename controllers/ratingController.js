import { Cars } from "../models/car.js"
import { Reservations } from "../models/reservation.js"
import { UserController } from "./userController.js"

export class RatingController {
  
  static async addRating(body) {
    await Reservations.addRating(body.rentalId, parseInt(body.rating), body.comment)
  }

  static async getRatings(userEmail, category, city) {
    const ratings = await Reservations.getRatings(userEmail, category, city)

    for (let rating of ratings){
      rating.user = await UserController.getUserDetails(rating.user)
      rating.car = await Cars.getCarByPlate(rating.carPlate)
    }

    return ratings
  }

}
