import express from 'express'

const router = express.Router()


router.get("/", (req, res) => {
    res.render("index")
});

router.get("/test", (req, res) => {
    res.render("test")
});



export {router}
