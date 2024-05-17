import express from 'express'
import { SearchController } from "../controllers/searchController.js"
import { validateSearch } from '../validators/validator.js'

const router = express.Router()

router.get("/", async (req, res) => {
    res.render("index", {home: 1})
})
router.post("/", validateSearch, async (req, res) => {
    const categories = await SearchController.getAvailiableCategories( req.body.city )
    const daysCount = await SearchController.getDays( req.body.rentDateFrom, req.body.rentDateTo )
    categories.forEach(category =>
        category.price = (category.price * daysCount).toLocaleString('el', { minimumFractionDigits: 2 })
    )

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
