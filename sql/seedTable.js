import { getDBConnection } from "../db/db.js";
import { albums } from "../data/data.js";

async function seedTable(){
    const db = await getDBConnection()

    try{
        await db.exec(`BEGIN TRANSACTION`)
        for(const{title, price,image, year,genre, stock, topSongs} of albums){
            await db.run(
                `INSERT INTO albums(title, price,image, year, genre, stock, topSongs)
                VALUES(?,?,?,?,?,?,?)`, [title, price, image, year, genre, stock,JSON.stringify(topSongs)]
            )
        }
        await db.exec(`COMMIT`)
        console.log(`Added to albums to the database`)
    }catch(err){
        await db.exec(`ROLLBACK`)
        console.log('Error adding albums to the database: ', err.message)

    }finally{
        await db.close()
        console.log('Database connection closed')
    }
}

seedTable()