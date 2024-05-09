import { db, closeDb } from "./database.js"
import bcrypt from 'bcrypt'

export class UsersCollection {
  static async initializeUsers() {
    // Drop and create collection
    db.dropCollection('users')
    await db.createCollection('users')

    // Populate collection
    const defaultPassword = await bcrypt.hash('ok', 10)
    await db.collection('users').insertMany([
      { name: 'Myron', email: 'myron@gmail.com', password: defaultPassword },
      { name: 'John', email: 'a@a.uk', password: defaultPassword },
      { name: 'John', email: 'ok@email.com', password: defaultPassword },
    ])

    console.log("Successfully initialized users collection!")
  }

  static async getAllUsers() {
    const query = {}
    const options = { projection: {_id:0, password:0} }

    return await db.collection('users').find(query, options).toArray()
  }

  static async getUserDetails(userEmail) {
    const query = { email:userEmail }
    const options = {}

    return await db.collection('users').find(query, options).toArray()
  }

  static async getPassword(userEmail) {
    const query = { email:userEmail }
    const options = { projection: {_id:0, password:1} }

    const result = await db.collection('users').findOne(query, options)
    return result?.password
  }
}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await UsersCollection.initializeUsers().catch(console.dir)
  // Print the results in JSON format
  console.dir( await UsersCollection.getAllUsers().catch(console.dir) )
  await closeDb()
}
