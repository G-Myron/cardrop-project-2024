import express from 'express'
import { SearchController } from "../controllers/searchController.js"
import { validateSearch } from '../validators/validator.js'
import fs from 'fs/promises'

const router = express.Router()

const citiesList = JSON.parse(await fs.readFile(`data/citiesList.json`))

router.get("/", async (req, res) => {
    res.locals.citiesList = citiesList
    res.render("index", {home: 1})
})
router.post("/", validateSearch, async (req, res) => {
    const categories = await SearchController.getAvailiableCategories( req.body.city )
    const daysCount = await SearchController.getDays( req.body.rentDateFrom, req.body.rentDateTo )
    categories.forEach(category => category.price = category.price * daysCount)

    res.locals.citiesList = citiesList
    res.render("index", {home: 1, city: req.body.city, categories: categories, days: daysCount})
})


router.get("/vehicle/:id", (req, res) => {
    const id = req.params.id
    if (Number.isInteger(Number(id))){
        res.render("vehicleDetails", {details: 1, id: id})
    }
    else {
        res.status(400)
        throw new Error("Error. Invalid id: " + id)
    }
})



export {router}
