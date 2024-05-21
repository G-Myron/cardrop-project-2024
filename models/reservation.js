import { ObjectId } from "mongodb"
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
          required: [ "user", "location", "dateFrom", "dateTo", "category", "carPlate" ],
          properties: {
            user: {bsonType: "string"}, // Foreign key
            category: {bsonType: "string"}, // Foreign key
            carPlate: {bsonType: ["string", "null"]}, // Foreign key
            location: {bsonType: "string"},
            dateFrom: {bsonType: "date"},
            dateTo: {bsonType: "date"},
            rating: {bsonType: "object"},
          }
      }}
    })

    // primary key the _id

    // Populate collection
    initReservations.forEach( resv => {
      resv.dateFrom = new Date(resv.dateFrom)
      resv.dateTo = new Date(resv.dateTo)
      if (resv.rating?.date)
        resv.rating.date = new Date(resv.rating.date)
    })

    await db.collection('reservations').insertMany(initReservations)

    console.log("Successfully initialized reservations collection!")
  }

  static async customFind(query, options) {
    return await db.collection('reservations').find(query, options).toArray()
  }

  static async getAllReservations() {
    return await this.customFind( {}, {sort: {dateTo: -1, dateFrom: -1}} )
  }

  static async getReservationsByUser(userEmail) {
    return await this.customFind( {user: userEmail}, {sort: {dateTo: -1, dateFrom: -1}} )
  }

  static async createReservation(reservationDto) {
    const query = reservationDto

    return await db.collection('reservations').insertOne(query)
  }

  static async deleteReservation(id) {
    const query = {_id: ObjectId.createFromHexString(id)}

    await db.collection('reservations').findOneAndDelete(query)
  }
  

  // --------- RATINGS

  static async getRentals(category, city) {
    const query = { category: category, location: city, carPlate: {$ne:null} }

    return await db.collection('reservations').find(query).toArray()
  }

  static async addRating(rentalId, rating, comment) {
    const query = { _id: ObjectId.createFromHexString(rentalId) }
    const updateDoc = { $set: { rating: {
      stars: rating,
      comment: comment,
      date: new Date()
    } }}

    return await db.collection('reservations').updateOne(query, updateDoc)
  }

}


// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await Reservations.initializeReservations().catch(console.dir)
  console.dir( await Reservations.getAllReservations().catch(console.dir) )

  await closeDb()
}
