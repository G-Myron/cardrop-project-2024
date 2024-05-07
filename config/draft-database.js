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

async function initialize() {
  try {
    // Connect the client to the server
    await client.connect()
    
    // Drop and create database and collection
    client.db('rentACar').dropDatabase()
    const db = client.db('rentACar')
    await db.createCollection('users')

    await db.collection('users').insertMany([
      { name: 'Myron', email: 'myron@gmail.com', password: 'ok' },
      { name: 'John', email: 'a@a.uk', password: 'ok' },
      { name: 'John', email: 'ok@email.com', password: 'ok' },
    ])
    
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

async function findDocuments() {
  try {
    // Connect the client to the server
    await client.connect()
    
    // Use database
    const db = client.db("rentACar")

    const query = { name: "John" }
    const options = { projection: {_id:0, email:1} }
    const cursor = db.collection('users').find(query, options)

    for await (const doc of cursor)
      console.dir(doc)
    
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}


await initialize().catch(console.dir)
await findDocuments().catch(console.dir)
