import express from 'express'

const router = express.Router()


router.post("/login", (req, res) => {
    res.send(req.body)
});

router.post("/logout", (req, res) => {
    res.send(req.body)
});



export {router}
