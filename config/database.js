import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb'

const password = process.env.MONGODB_PASSWORD //Ask your admin

const uri = `mongodb+srv://myron:${password}@rentcarcluster.deg8eob.mongodb.net/?retryWrites=true&w=majority&appName=RentCarCluster`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoDbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})


async function initializeDB() {
  try {
    await mongoDbClient.connect()
    
    // Drop and create database
    mongoDbClient.db('rentACar').dropDatabase()
    mongoDbClient.db('rentACar')
  }
  finally { await mongoDbClient.close() }
}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  console.log("Running database script..")
  await initializeDB().catch(console.dir)
}

// Open connection globaly for all app (has pros and cons)
const _ = await mongoDbClient.connect()
const closeDb = async () => await mongoDbClient.close()
const db = mongoDbClient.db("rentACar")

export { db, closeDb }
