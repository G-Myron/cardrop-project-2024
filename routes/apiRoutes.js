import express from 'express'

const router = express.Router()


router.post("/login/:myParam", (req, res) => {
    res.send(req.body)
});



export {router}
