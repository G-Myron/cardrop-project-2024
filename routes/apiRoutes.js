import express from 'express'
import { UserController } from '../controllers/userController.js'

const router = express.Router()


router.get("/users", async (req, res) => {
    res.send(await UserController.getAllUsers())
})
router.get("/users/:email", async (req, res) => {
    res.send(await UserController.getUserDetails(req.params.email))
})

router.post("/login", async (req, res) => {
    if (await UserController.handleLogin(req.body)){
        req.session.username = req.body.email
        res.redirect("/")
    }
    else res.redirect("./logout")
})

router.post("/signup", async (req, res) => {
    try {
        await UserController.handleSignup(req.body)
        req.session.username = req.body.email
        res.redirect("/")
    }
    catch(error) { throw error }
})


router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
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
