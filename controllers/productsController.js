import { getDBConnection } from '../db/db.js'

export async function getAlbums(req, res){
    try{
            const db = await getDBConnection()

            const albumRows = await db.all (`SELECT DISTINCT title FROM albums`)
            const albums = albumRows.map(row=>row.title)
            res.json(albums)
            console.log('album got')
    } catch(err){
        console.log('failed to get albums: ', err.message)
        res.status(500).json({error: 'Failed to fetch albums', details: err.message})
        
    }
}