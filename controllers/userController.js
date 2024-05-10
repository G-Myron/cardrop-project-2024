import { Users } from "../models/user.js"
import bcrypt from 'bcrypt'

export class UserController {
  static async getAllUsers() {
    return await Users.getAllUsers()
  }
  static async getUserDetails(email) {
    return await Users.getUserDetails(email)
  }

  static async handleLogin(email, password) {
    const passwordDb = await Users.getPassword(email)
    if (!passwordDb) throw new Error("No account corresponds to the email you have provided.")
    return await bcrypt.compare(password, passwordDb)
  }
}

