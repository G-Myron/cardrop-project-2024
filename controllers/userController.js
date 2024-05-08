import { getAllUsers } from "../config/database_users.js"

export class UserController {
  static async getAllUsers() {
    return await getAllUsers()
  }

  static async handleLogin() {
    return
  }
}

