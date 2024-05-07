import express from 'express'

const router = express.Router()


router.get("/", (req, res) => {
    res.render("index", {home: 1})
});

router.get("/signup", (req, res) => {
    res.render("user/create", {signup: 1})
});

router.get("/login", (req, res) => {
    res.render("user/login", {login: 1})
});


router.get("/vehicle/:id", (req, res) => {
    const id = req.params.id
    if (Number.isInteger(Number(id))){
        res.render("vehicleDetails", {details: 1, id: id})
    }
    else {
        res.status(400)
        throw new Error("Error. Invalid id: " + id)
    }
});

router.get("/book", (req, res) => {
    res.send("Book the car with id=?")
});



export {router}
