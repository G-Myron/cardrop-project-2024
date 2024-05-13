import express from 'express'

const router = express.Router()


router.get("/", (req, res) => {
    res.render("index", {home: 1})
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
