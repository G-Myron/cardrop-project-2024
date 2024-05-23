import express from 'express'
import { AdminController } from "../controllers/adminController.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("admin")
})

router.all("/users", async (req, res) => {
  const maxCount = await AdminController.countUsers()
  let [limit, skip, page] = pagination(req.body, maxCount)

  const users = await AdminController.getAllUsers(limit, skip)
  res.render("admin/users", {users: users, limit: limit, skip: skip, page: page})
})

router.all("/cars", async (req, res) => {
  const maxCount = await AdminController.countCars()
  let [limit, skip, page] = pagination(req.body, maxCount)

  const cars = await AdminController.getAllCars(limit, skip)
  res.render("admin/cars", {cars: cars, limit: limit, skip: skip, page: page})
})

router.all("/reservations", async (req, res) => {
  const maxCount = await AdminController.countReservations()
  let [limit, skip, page] = pagination(req.body, maxCount)
  
  const reservs = await AdminController.getAllReservations(limit, skip)
  res.render("admin/reservations", {reservations: reservs, limit: limit, skip: skip, page: page})
})


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
