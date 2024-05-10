import { db, closeDb } from "../config/database.js"
import { initUsers } from "../config/initialData.js"

export class Users {
  static async initializeUsers() {
    // Drop and create collection with schema
    db.dropCollection('users')
    await db.createCollection('users',  {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "User Object Validation",
          required: [ "name", "email", "password" ],
          properties: {
            name: {bsonType: "string"},
            email: {bsonType: "string"},
            password: {bsonType: "string"},
          }
      }}
    })

    // Populate collection
    await db.collection('users').insertMany(initUsers)
    console.log("Successfully initialized users collection!")
  }

  static async getAllUsers() {
    const query = {}
    const options = { projection: {_id:0, password:0} } // Hide the passwords

    return await db.collection('users').find(query, options).toArray()
  }

  static async getUser(userEmail) {
    const query = { email:userEmail }
    const options = {}

    // Get user from database
    const user = await db.collection('users').findOne(query, options)

    if (!user) throw new Error("No account corresponds to the email you have provided.")
    return user
  }

  static async createUser(userDto) {
    const query = userDto
    const options = {}
    
    // Create user in database
    return await db.collection('users').insertOne(query, options)
  }
}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Users.initializeUsers().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Users.getAllUsers().catch(console.dir) )
  await closeDb()
}
