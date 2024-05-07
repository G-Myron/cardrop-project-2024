import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb'

const password = process.env.MONGODB_PASSWORD //Ask your admin

const uri = `mongodb+srv://myron:${password}@rentcarcluster.deg8eob.mongodb.net/?retryWrites=true&w=majority&appName=RentCarCluster`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function checkUp() {
  try {
    // Connect the client to the server
    await client.connect()
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Successfully connected to MongoDB!")
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

checkUp().catch(console.dir)
