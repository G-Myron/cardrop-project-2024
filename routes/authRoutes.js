import express from 'express'
import { UserController } from '../controllers/userController.js'

const router = express.Router()


router.post("/login", async (req, res, next) => {
    try {
        if (await UserController.handleLogin(req.body)){
            req.session.username = req.body.email
            res.redirect("/")
        }
        else res.redirect("./logout")
    }
    catch(error) {
        next(error)
    }
})

router.post("/signup", async (req, res, next) => {
    try {
        await UserController.handleSignup(req.body)
        req.session.username = req.body.email
        res.redirect("/")
    }
    catch(error) {
        next(error)
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})



export {router}
