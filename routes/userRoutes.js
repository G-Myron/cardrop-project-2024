import express from 'express'
import { ReservationController } from "../controllers/reservationController.js"

const router = express.Router()


router.get("/edit", (req, res) => {
    res.render("user/edit", {edit: 1})
})

router.get("/my_reservations", async (req, res) => {
    if (req.query.current === undefined && req.query.canceled === undefined && req.query.oldRentals === undefined){
        res.redirect(req._parsedOriginalUrl.pathname + "?current=true&canceled=true&oldRentals=true")
        return
    }

    const current = ["false","0","",undefined].includes(req.query.current)? false:true
    const canceled = ["false","0","",undefined].includes(req.query.canceled)? false:true
    const oldRentals = ["false","0","",undefined].includes(req.query.oldRentals)? false:true

    const reservations = await ReservationController.getReservationsByUser(
        req.session.logged_in_user?.email, current, canceled, oldRentals)
    
    res.render("user/reservations", {reserv: 1, reservations: reservations,
        current:current, canceled:canceled, oldRentals:oldRentals})
})


export {router}
