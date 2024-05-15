import { db, closeDb } from "../config/database.js";
import { initTypes } from "../config/initialData.js";

export class CarTypes {

  static async initializeTypes() {
    // Drop and create collection with schema
    db.dropCollection('car_types')
    await db.createCollection('car_types',  {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "Car-Type Object Validation",
          required: [ "name" ],
          properties: {
            name: {bsonType: "string"},
          }
      }}
    })

    // Populate collection
    await db.collection('car_types').insertMany(initTypes)
    console.log("Successfully created car types collection!")
  }

  static async customFind(query, options) {
    return await db.collection('car_types').find(query, options).toArray()
  }

  static async getAllTypes() {
    return await this.customFind( {}, {projection: { _id: 0 }} )
  }

}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await CarTypes.initializeTypes().catch(console.dir)
  // Print the results in JSON format
  console.dir( await CarTypes.getAllTypes().catch(console.dir) )
  await closeDb()
}
