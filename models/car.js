import { db, closeDb } from "../config/database.js"
import { initCars } from "../config/initialData.js"

export class Cars {

  static async initializeCars() {
    // Drop and create collection with schema
    db.dropCollection('cars')
    await db.createCollection('cars',  {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "Car Object Validation",
          required: [ "type", "model", "plate", "location" ],
          properties: {
            type: {bsonType: "string"},
            model: {bsonType: "string"},
            plate: {bsonType: "string"},
            location: {bsonType: "string"},
          }
      }}
    })

    // Populate collection
    await db.collection('cars').insertMany(initCars)
    console.log("Successfully initialized cars collection!")
  }

  static async customFind(query, options) {
    return await db.collection('cars').find(query, options).toArray()
  }

  static async getAllCars() {
    const query = {}
    const options = { projection: {_id:0} }

    return await this.customFind(query, options)
  }

  static async getCarsOfType(type) {
    const query = { type: type}
    const options = {}

    return await this.customFind(query, options)
  }

  static async getCarsFromLocation(location) {
    const query = { location: location}
    const options = {}

    return await this.customFind(query, options)
  }

}


// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Cars.initializeCars().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Cars.getAllCars().catch(console.dir) )
  await closeDb()
}
