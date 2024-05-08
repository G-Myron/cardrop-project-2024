import express from 'express'
import { UserController } from '../controllers/userController.js'

const router = express.Router()


router.get("/users", async (req, res) => {
    res.send(await UserController.getAllUsers())
})

router.post("/login", async (req, res) => {
    await UserController.handleLogin()
    res.redirect("/")
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
