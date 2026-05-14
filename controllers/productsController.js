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

export async function getProducts(req, res){
    try{
        const db  = await getDBConnection()

        let query = `SELECT * FROM albums`
        let params = []

        const {album, search} = req.query

        if(album){
            album +=' WHERE title = ?'
            params.push(album)
        } else if(search){
            query += '  WHERE title LIKE ? OR genre LIKE ? OR topSongs ?'
            const searchPattern = `%${search}%`
            params.push(searchPattern, searchPattern, searchPattern)
        }

        const products = await db.all(query, params)
        res.json(products)
    } catch (err){
            res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
}