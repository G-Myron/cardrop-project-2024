import { findDocuments } from "../config/database_users.js"

export class UserController {
  static async findAll() {
    return await findDocuments()
  }
}

