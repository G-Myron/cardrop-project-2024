import express from 'express'
import { SearchController } from "../controllers/searchController.js"
import { validateSearch } from '../validators/validator.js'

const router = express.Router()


router.get("/", async (req, res) => {
    res.render("index", {home: 1})
})
router.post("/", validateSearch, async (req, res) => {
    const categories = await SearchController.getAvailiableCategories( req.body.city )
    res.render("index", {home: 1, categories: categories})
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
