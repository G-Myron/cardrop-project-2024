import express from 'express'
import { UserController } from '../controllers/userController.js'
import { ReservationController } from '../controllers/reservationController.js'
import { RatingController } from '../controllers/ratingController.js'

const router = express.Router()


router.get("/users", async (req, res) => {
    res.send(await UserController.getAllUsers())
})
router.get("/users/:email", async (req, res) => {
    res.send(await UserController.getUserDetails(req.params.email))
})

router.post("/reserve", async (req, res, next) => {
    try {
        await ReservationController.saveReservation( req.session.logged_in_user?.email, req.body)
        
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

router.post("/set_rating", async (req, res, next) => {
    await RatingController.addRating(req.body)
    res.redirect("/user/my_reservations")
})


export {router}
