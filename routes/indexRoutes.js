import express from 'express'
import { SearchController } from "../controllers/searchController.js"
import { validateSearch } from '../validators/validator.js'

const router = express.Router()

router.get("/", async (req, res) => {
  res.render("index", {home: 1})
})
router.post("/", validateSearch, async (req, res) => {
  const daysCount = SearchController.getDays( req.body.rentDateFrom, req.body.rentDateTo )
  const categories = await SearchController.getAvailableCategories( req.body.city, daysCount )

  res.render("index", {
    home: 1,
    city: req.body.city,
    dateFrom: req.body.rentDateFrom,
    dateTo: req.body.rentDateTo,
    categories: categories,
    days: daysCount
  })
})


export {router}
