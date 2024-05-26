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
          required: [ "user", "dateFrom", "dateTo", "category", "location", "carPlate" ],
          properties: {
            user: {bsonType: "string"}, // Foreign key
            category: {bsonType: "string"}, // Foreign key
            carPlate: {bsonType: ["string", "null"]}, // Foreign key
            dateFrom: {bsonType: "date"},
            dateTo: {bsonType: "date"},
            location: {bsonType: "string"},
            canceled: {bsonType: "bool"},
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

    console.log(`Successfully initialized reservations collection!`)
  }

  static async customFind(query, options, limit=0, skip=0) {
    return await db.collection('reservations').find(query, options).limit(limit).skip(skip).toArray()
  }

  static async getAllReservations(limit=0, skip=0, query={}) {
    const options = {sort: {dateTo: -1, dateFrom: -1, canceled: 1}}
    return await this.customFind( query, options, limit, skip )
  }
  static async countReservations() {
    const filter = {}
    return await db.collection('reservations').countDocuments(filter)
  }
  static async countReservationsByUser(userEmail) {
    const filter = { user: userEmail }
    return await db.collection('reservations').countDocuments(filter)
  }

  static async getReservationsByUser(userEmail, current=true, canceled=true, old=true, limit=0, skip=0) {
    const query = {user: userEmail}

    if (!current) {
      query.$or = [{canceled: true}, {carPlate: {$ne:null}}]
    }
    if (!canceled) query.canceled = false
    if (!old) query.carPlate = null

    const reservs = await this.getAllReservations(limit, skip, query)
    return reservs
  }

  static async createReservation(reservationDto) {
    const query = reservationDto

    return await db.collection('reservations').insertOne(query)
  }

  static async cancelReservation(id) {
    const query = {_id: ObjectId.createFromHexString(id)}
    const updateDoc = { $set: { canceled: true }}

    await db.collection('reservations').updateOne(query, updateDoc)
  }

  static async deleteReservation(id) {
    const query = {_id: ObjectId.createFromHexString(id)}

    await db.collection('reservations').findOneAndDelete(query)
  }

  static async updateReservation(reservationDto, id) {
    const query = { _id: ObjectId.createFromHexString(id) }
    const updateDoc = { $set: reservationDto }

    return await db.collection('reservations').updateOne(query, updateDoc)
  }
  

  // --------- RATINGS

  static async getRentals(category, location) {
    const query = { category: category, location: location, carPlate: {$ne:null} }
    const options = {sort: {"rating.stars": -1, "rating.date": -1}}

    return await db.collection('reservations').find(query, options).toArray()
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
