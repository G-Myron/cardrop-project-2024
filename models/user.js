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
          required: [ "name", "surname", "email", "password" ],
          properties: {
            name: {bsonType: "string"},
            surname: {bsonType: "string"},
            tel: {bsonType: "string"},
            email: {bsonType: "string"},
            password: {bsonType: "string"},
          }
      }}
    })

    // Set primary key
    await db.collection('users').createIndex({ email: 1}, {unique: true})

    // Populate collection
    await db.collection('users').insertMany(initUsers)
    console.log(`Successfully initialized users collection!`)
  }

  static async customFind(query, options, limit=0, skip=0) {
    return await db.collection('users').find(query, options).limit(limit).skip(skip).toArray()
  }

  static async getAllUsers(limit=0, skip=0) {
    const query = {}
    const options = { projection: {_id:0, password:0}, sort:{ _id: -1 } } // Hide the passwords

    return await this.customFind(query, options, limit, skip)
  }
  static async countUsers() {
    const filter = {}
    return await db.collection('users').countDocuments(filter)
  }

  static async getUser(userEmail) {
    const query = { email:userEmail }
    const options = {}

    // Get user from database
    return await db.collection('users').findOne(query, options)
  }

  static async createUser(userDto) {
    const query = { email: userDto.email }
    const doc = userDto
    
    // Check if user exists
    const oldUser = await db.collection('users').findOne(query)
    if (oldUser) throw new Error("Account with this email already exists.")
    
    // Create user in database
    await db.collection('users').insertOne(doc)

    return await db.collection('users').findOne(query)
  }

  static async updateUser(userDto) {
    const query = { email: userDto.email }
    const updateDoc = { $set: userDto }

    await db.collection('users').updateOne(query, updateDoc)

    return await db.collection('users').findOne(query)
  }

  static async deleteUser(email) {
    const query = {email: email}

    await db.collection('users').findOneAndDelete(query)
  }
}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Users.initializeUsers().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Users.getAllUsers().catch(console.dir) )
  await closeDb()
}
