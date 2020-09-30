import { MongoClient } from 'mongodb'

let url = process.env.MONGODB_URL
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!url) {
    throw new Error(
        'Please define the MONGODB_URL environment variable inside .env.local'
    )
}

if (!dbName) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = await client.db(dbName)

    cachedClient = client
    cachedDb = db

    return { client, db }
}