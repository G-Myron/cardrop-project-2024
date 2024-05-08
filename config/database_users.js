import { mongoDbClient } from "./database.js"

async function initializeUsers() {
  try {
    await mongoDbClient.connect()
    
    // Drop and create collection
    const db = mongoDbClient.db('rentACar')
    db.dropCollection('users')
    await db.createCollection('users')

    // Populate collection
    await db.collection('users').insertMany([
      { name: 'Myron', email: 'myron@gmail.com', password: 'ok' },
      { name: 'John', email: 'a@a.uk', password: 'ok' },
      { name: 'John', email: 'ok@email.com', password: 'ok' },
    ])
    
  }
  finally { await mongoDbClient.close() }
}

async function findDocuments() {
  try {
    await mongoDbClient.connect()
    const db = mongoDbClient.db("rentACar")

    const query = {}
    const options = { projection: {_id:0} }
    const result = await db.collection('users').find(query, options).toArray();

    // Print the results in JSON format
    // console.dir(result)

    await mongoDbClient.close()
    return result
  }
  finally { await mongoDbClient.close() }
}

// If __name__ == main
if (process.argv[1] === import.meta.filename){
  await initializeUsers().catch(console.dir)
  await findDocuments().catch(console.dir)
}

export { initializeUsers, findDocuments }
