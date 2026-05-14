import { getDBConnection } from "../db/db.js";

async function dropTable(){
    const db = await getDBConnection()

    await db.exec(`DROP TABLE IF EXISTS albums`)

    await db.close()
    console.log('Table dropped!')
}

dropTable()