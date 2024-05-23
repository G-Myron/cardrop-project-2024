import express from 'express'
import { AdminController } from "../controllers/adminController.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("admin")
})

router.get("/users", async (req, res) => {
  const users = await AdminController.getAllUsers()
  res.render("admin/users", {users: users})
})

router.get("/cars", async (req, res) => {
  const cars = await AdminController.getAllCars()
  res.render("admin/cars", {cars: cars})
})

router.get("/reservations", async (req, res) => {
  const reservs = await AdminController.getAllReservations()
  res.render("admin/reservations", {reservations: reservs})
})


export {router}
