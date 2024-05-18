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

  static async getAllCategories(daysCount=undefined) {
    const options = {projection: { _id: 0 }, sort:{ _id: 1 }}
    
    const categories = await this.customFind({}, options)

    if (daysCount)
      categories.forEach( category => category.price = (category.price * daysCount).toLocaleString('el', { minimumFractionDigits: 2 }) )
    return categories
  }

  static async getCategory(name, daysCount=undefined) {
    const query = { name: name }
    const options = {projection: { _id: 0 }, sort:{ _id: 1 }}

    const category = await db.collection('categories').findOne(query, options)

    if (daysCount)
      category.price = (category.price * daysCount).toLocaleString('el', { minimumFractionDigits: 2 })

    return category
  }

}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Categories.initializeCategories().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Categories.getAllCategories().catch(console.dir) )
  await closeDb()
}
