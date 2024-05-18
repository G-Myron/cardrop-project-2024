import { db, closeDb } from "../config/database.js"
import { initCategories } from "../config/initialData.js"

export class Categories {

  static async initializeCategories() {
    // Drop and create collection with schema
    db.dropCollection('categories')
    await db.createCollection('categories',  {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "Category Object Validation",
          required: [ "name" ],
          properties: {
            name: {bsonType: "string"},
          }
      }}
    })

    // Set primary key
    await db.collection('categories').createIndex({ name: 1}, {unique: true})

    // Populate collection
    await db.collection('categories').insertMany(initCategories)
    console.log("Successfully created categories collection!")
  }

  static async customFind(query, options) {
    return await db.collection('categories').find(query, options).toArray()
  }

  static async getAllCategories() {
    const options = {projection: { _id: 0 }, sort:{ _id: 1 }}
    return await this.customFind({}, options)
  }

  static async getCategory(name) {
    const query = { name: name }
    const options = {}

    return await db.collection('categories').findOne(query, options)
  }

}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Categories.initializeCategories().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Categories.getAllCategories().catch(console.dir) )
  await closeDb()
}
