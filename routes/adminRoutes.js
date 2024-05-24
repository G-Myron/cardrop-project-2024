import express from 'express'
import { AdminController } from "../controllers/adminController.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("admin")
})

// ********** POST REQUESTS

router.post("/users", async (req, res, next) => {
  try {
    if (req.body.delete)
      await AdminController.deleteUser(req.body.email)
    else
      await AdminController.updateUser(req.body)
    
    res.redirect(req._parsedOriginalUrl.path)
  }
  catch(err) {next(err)}
})

router.post("/cars", async (req, res, next) => {
  try {
    if (req.body.delete)
      await AdminController.deleteCar(req.body.plate)
    else
      await AdminController.updateCar(req.body)
    
    res.redirect(req._parsedOriginalUrl.path)
  }
  catch(err) {next(err)}
})

router.post("/reservations", async (req, res, next) => {
  try {
    if (req.body.delete)
      await AdminController.deleteReservation(req.body.reservationId)
    else
      await AdminController.updateReservation(req.body)
    
    res.redirect(req._parsedOriginalUrl.path)
  }
  catch(err) {next(err)}
})


// ********** GET REQUESTS

router.get("/users", async (req, res, next) => {
  try {
    const maxCount = await AdminController.countUsers()
    let [limit, skip, page] = pagination(req.query, maxCount)

    const users = await AdminController.getAllUsers(limit, skip)
    res.render("admin/users", {users: users, limit: limit, skip: skip, page: page})
  }
  catch(err) {next(err)}
})

router.get("/cars", async (req, res, next) => {
  try {
    const maxCount = await AdminController.countCars()
    let [limit, skip, page] = pagination(req.query, maxCount)

    const cars = await AdminController.getAllCars(limit, skip)
    res.render("admin/cars", {cars: cars, limit: limit, skip: skip, page: page})
  }
  catch(err) {next(err)}
})

router.get("/reservations", async (req, res, next) => {
  try {
    const maxCount = await AdminController.countReservations(req.query.user)
    let [limit, skip, page] = pagination(req.query, maxCount)
    
    const reservs = await AdminController.getAllReservations(req.query.user, limit, skip)
    res.render("admin/reservations", {reservations: reservs,
    user: req.query.user, limit: limit, skip: skip, page: page})
  }
  catch(err) {next(err)}
})


// ********* HELPER FUNCTIONS

function pagination(body, maxCount) {
  const limit = body.limit? parseInt(body.limit): 15
  const maxPage = Math.floor(maxCount/limit)

  let page = body.page?? 0
  if (body.prev && page>0)
    page -= 1
  else if (body.next && page<maxPage)
    page -= -1

  const skip = page * limit

  return [limit, skip, page]
}


export {router}
