import { getDBConnection } from '../db/db.js'

async function createTable(){
    
    const db = await getDBConnection()

    await db.exec(`
            CREATE TABLE IF NOT EXISTS albums(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title  TEXT NOT NULL,
            price FLOAT NOT NULL,
            image TEXT NOT NULL,
            era TEXT NOT NULL,
            year INTEGER,
            genre TEXT,
            stock INTEGER,
            topSongs TEXT
            )
        `)

        console.log('Database album created')
}

createTable()