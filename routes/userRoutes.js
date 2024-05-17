import express from 'express'

const router = express.Router()


router.get("/edit", (req, res) => {
    res.render("user/edit", {edit: 1})
})

router.get("/my_reservations", (req, res) => {
    res.render("user/reservations", {reserv: 1})
})


export {router}
