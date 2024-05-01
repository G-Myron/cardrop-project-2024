import express from 'express'

const router = express.Router()


router.get("/", (req, res) => {
    res.redirect("login")
})

router.get("/signup", (req, res) => {
    res.render("user/create");
});

router.get("/login", (req, res) => {
    res.render("user/login");
});



router.use((req, res) => {
    res.redirect(".")
})


export {router}
