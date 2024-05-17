import express from 'express'
import { DetailsController } from "../controllers/detailsController.js"

const router = express.Router()

router.get("/:category", async (req, res, next) => {
  // Validation
  try {
    const acceptableCategories = (await DetailsController.getAcceptableCategories()).map( cat => cat.name)
    if (! acceptableCategories.includes(req.params.category)){
        res.status(400)
        throw new Error("Invalid vehicle category.")
    }
  }
  catch(err) { next(err) }
  
  const category = await DetailsController.getCategoryDetails(req.params.category)
  const daysCount = await DetailsController.getDays( req.query.from, req.query.to )
  category.price = (category.price * daysCount).toLocaleString('el', { minimumFractionDigits: 2 })

  res.render("vehicleDetails", {
    city: req.query.city,
    dateFrom: new Date(req.query.from).toLocaleDateString(),
    dateTo: new Date(req.query.to).toLocaleDateString(),
    category: category,
    days: daysCount
  })

})



export {router}