import express from 'express'
import { UserController } from '../controllers/userController.js'
import { ReservationController } from '../controllers/reservationController.js'

const router = express.Router()


router.get("/users", async (req, res) => {
    res.send(await UserController.getAllUsers())
})
router.get("/users/:email", async (req, res) => {
    res.send(await UserController.getUserDetails(req.params.email))
})

router.post("/reserve", async (req, res, next) => {
    try {
        const dateFrom = new Date(req.body.dateFrom)
        const dateTo = new Date(req.body.dateTo)

        await ReservationController.saveReservation( req.session.username,
            req.body.category, req.body.city, dateFrom, dateTo)
        
        res.redirect("/user/my_reservations")
    }
    catch(err) {
        next(err)
    }
})

router.post("/unreserve", async (req, res, next) => {
    await ReservationController.deleteReservation(req.body.reservationId)
    res.redirect("/user/my_reservations")
})


export {router}
