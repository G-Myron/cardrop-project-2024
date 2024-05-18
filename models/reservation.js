import { db, closeDb } from "../config/database.js"
import { initReservations } from "../config/initialData.js"

export class Reservations {

  static async initializeReservations() {
    // Drop and create collection with schema
    db.dropCollection('reservations')
    await db.createCollection('reservations',  {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "Reservation Object Validation",
          required: [ "user", "category", "dateFrom", "dateTo", "closed" ],
          properties: {
            user: {bsonType: "string"}, // Foreign key
            category: {bsonType: "string"}, // Foreign key
            dateFrom: {bsonType: "date"},
            dateTo: {bsonType: "date"},
            closed: {bsonType: "bool"},
          }
      }}
    })

    // Set primary key
    // await db.collection('reservations').createIndex({ user: 1, category: 1 }, {unique: true})

    // Populate collection
    initReservations.forEach( resv => {
      resv.dateFrom = new Date(resv.dateFrom)
      resv.dateTo = new Date(resv.dateTo)
    })
    await db.collection('reservations').insertMany(initReservations)

    console.log("Successfully initialized reservations collection!")
  }

  static async customFind(query, options) {
    return await db.collection('reservations').find(query, options).toArray()
  }

  static async getAllReservations() {
    return await this.customFind( {}, {projection: { _id: 0 }} )
  }

  static async getReservationsByUser(user) {
    return await this.customFind( {user:user}, {projection: { _id: 0 }} )
  }

}


// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Reservations.initializeReservations().catch(console.dir)
  // Print the results in JSON format
  console.dir( await Reservations.getAllReservations().catch(console.dir) )
  await closeDb()
}
