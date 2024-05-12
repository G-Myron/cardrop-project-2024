import { Users } from "../models/user.js"
import bcrypt from 'bcrypt'

export class UserController {
  static async getAllUsers() {
    const users = await Users.getAllUsers()
    return users
  }
  static async getUserDetails(email) {
    const user = await Users.getUser(email)
    return user
  }

  static async handleLogin(htmlBody) {
    const user = await Users.getUser(htmlBody.email)
    if (!user) throw new Error("No account corresponds to the email you have provided.")
    
    const validPassword = await bcrypt.compare(htmlBody.password, user.password)
    return validPassword
  }

  static async handleSignup(htmlBody) {
    const passwordHash = await bcrypt.hash(htmlBody.password, 10)
    const userDto = {
      name: htmlBody.name,
      email: htmlBody.email,
      password: passwordHash
    }
    await Users.createUser(userDto)
  }
}

