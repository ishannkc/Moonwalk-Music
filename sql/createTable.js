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
        await db.close()

        console.log('Database album created')
}

// createTable()

async function createTableUsers(){
    const db = await getDBConnection()

    await db.exec(`
            CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        await db.close()
        console.log('Table Users created')
}
// createTableUsers()

async function createCartItems(){
    const db = await getDBConnection()

    await db.exec(`
                CREATE TABLE IF NOT EXISTS cart_items(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                album_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY(user_id) REFERENCES users(id),
                FOREIGN KEY(album_id) REFERENCES albums(id)
    );
        
        `)

        await db.close()
        console.log('Cart Items Table Created')
}

createCartItems()