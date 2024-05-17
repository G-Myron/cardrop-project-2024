import express from 'express'
import { DetailsController } from "../controllers/detailsController.js"

const router = express.Router()

router.get("/:category", async (req, res) => {
  if (!true){
      res.status(400)
      throw new Error("Invalid vehicle category.")
  }
  
  const category = await DetailsController.getCategoryDetails(req.params.category)
  const daysCount = await DetailsController.getDays( req.query.from, req.query.to )
  category.price = (category.price * daysCount).toLocaleString('el', { minimumFractionDigits: 2 })

  res.render("vehicleDetails", {category: category, days: daysCount})

})



export {router}