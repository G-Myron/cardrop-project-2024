import express from 'express'
import { UserController } from '../controllers/userController.js'

const router = express.Router()


router.post("/login", async (req, res) => {
    res.send(await UserController.findAll())
})

router.post("/signup", (req, res) => {
    res.send(req.body)
})


router.get("/logout", (req, res) => {
    res.send(req.body)
})

router.post("/reserve", (req, res) => {
    console.log(req.body)
    res.redirect("/user/my_reservations")
})



export {router}
