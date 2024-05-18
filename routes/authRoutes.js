import express from 'express'
import { UserController } from '../controllers/userController.js'
import { validateLogin, validateSignup } from '../validators/validator.js'

const router = express.Router()


router.get("/login", (req, res) => {
    req.session.username? res.redirect("/") :
        res.render("user/login")
})
router.post("/login", validateLogin,
    async (req, res) => {
        if (req.body.rememberMe)
            req.session.cookie.maxAge = 365*24*3600e3 // 1 year
        try {
            if (await UserController.handleLogin(req.body)){
                req.session.username = req.body.email
                res.redirect("/")
            }
            else {
                throw new Error("Wrong credentials")
            }
        }
        catch(error) {
            req.session.destroy()
            res.render("user/login", {errorMsg: error.message})
        }
})


router.get("/signup", (req, res) => {
    req.session.username? res.redirect("/") :
        res.render("user/create")
})
router.post("/signup", validateSignup,
    async (req, res) => {
        try {
            await UserController.handleSignup(req.body)
            req.session.username = req.body.email
            res.redirect("/")
        }
        catch(error) {
            req.session.destroy()
            res.render("user/create", {errorMsg: error.message})
        }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})



export {router}
