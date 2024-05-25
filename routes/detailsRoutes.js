import express from 'express'
import { DetailsController } from "../controllers/detailsController.js"
import { RatingController } from '../controllers/ratingController.js'

const router = express.Router()

router.get("/:category", async (req, res, next) => {
  try {
    // Validation
    const acceptableCategories = (await DetailsController.getAcceptableCategories()).map( cat => cat.name)
    if (! acceptableCategories.includes(req.params.category)) {
      res.status(400)
      throw new Error("Invalid vehicle category.")
    }
    if (! res.locals.citiesList.includes(req.query.city)) {
      throw new Error("We are sorry, but we don't provide vehicles in " + req.query.city)
    }
    if (! (req.query.from && req.query.to) || new Date(req.query.from) >= new Date(req.query.to) ) {
      res.status(400)
      throw new Error("Please use properly the app through the UI.")
    }
    if ( new Date(req.query.from) < new Date().setDate( new Date().getDate()-1 ) ) {
      res.status(400)
      throw new Error("You cannot Reserve a vehicle for past dates Please choose future dates.")
    }
  
    const daysCount = DetailsController.getDays( req.query.from, req.query.to )
    const category = await DetailsController.getCategoryDetails( req.params.category, daysCount )
    const ratings = await RatingController.getRentals(category.name, req.query.city)

    res.render("vehicleDetails", {
      city: req.query.city,
      dateFrom: req.query.from,
      dateTo: req.query.to,
      category: category,
      days: daysCount,
      ratings: ratings
    })
  }
  catch(err) { next(err) }

})



export {router}