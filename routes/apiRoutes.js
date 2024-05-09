import express from 'express'
import { UserController } from '../controllers/userController.js'

const router = express.Router()


router.get("/users", async (req, res) => {
    console.log(req.params)
    res.send(await UserController.getAllUsers())
})
router.get("/users/:email", async (req, res) => {
    res.send(await UserController.getUserDetails(req.params.email))
})

router.post("/login", async (req, res) => {
    if (await UserController.handleLogin(req.body.email, req.body.password))
        res.redirect("/")
    else res.redirect("/login")
})

router.post("/signup", (req, res) => {
    res.send(req.body)
})


router.get("/logout", (req, res) => {
    res.send(req.body)
})

router.post("/search", (req, res) => {
    console.log(req.body)
    res.redirect("/")
})

router.post("/reserve", (req, res) => {
    console.log(req.body)
    res.redirect("/user/my_reservations")
})



export {router}
