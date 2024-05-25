import express from 'express'
import { UserController } from '../controllers/userController.js'
import { validateEdit, validateLogin, validateSignup } from '../validators/validator.js'

const router = express.Router()


router.get("/login", (req, res) => {
    req.session.logged_in_user? res.redirect("/") :
        res.render("user/login")
})
router.post("/login", validateLogin,
    async (req, res) => {
        if (req.body.rememberMe)
            req.session.cookie.maxAge = 365 * 24 * 3600e3 // 1 year
        try {
            const user = await UserController.handleLogin(req.body)
            if (user){
                req.session.logged_in_user = user
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
    req.session.logged_in_user? res.redirect("/") :
        res.render("user/signup")
})
router.post("/signup", validateSignup,
    async (req, res) => {
        try {
            const user = await UserController.handleSignup(req.body)
            req.session.logged_in_user = user
            res.redirect("/")
        }
        catch(error) {
            req.session.destroy()
            res.render("user/signup", {errorMsg: error.message})
        }
})

router.post("/edit", validateEdit,
    async (req, res) => {
        try {
            const user = await UserController.handleEdit(req.body)
            req.session.logged_in_user = user
            res.redirect("/")
        }
        catch(error) {
            res.render("user/edit", {errorMsg: error.message})
        }
})


router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})



export {router}
