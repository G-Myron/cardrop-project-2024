import express from 'express'

const router = express.Router()


router.post("/login", (req, res) => {
    res.send(req.body)
});

router.post("/signup", (req, res) => {
    res.send(req.body)
});


router.get("/logout", (req, res) => {
    res.send(req.body)
});

router.post("/reserve", (req, res) => {
    console.log(req.body)
    res.redirect("/user/my_reservations")
})



export {router}
