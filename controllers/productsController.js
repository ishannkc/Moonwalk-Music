import { getDBConnection } from '../db/db.js'

export async function getAlbums(req, res){
    try{
            const db = await getDBConnection()

            const albumRows = await db.all (`SELECT DISTINCT title FROM albums`)
            const albums = albumRows.map(row=>row.title)
            res.json(albums)
            // console.log('album got')
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
            query +=' WHERE title = ?'
            params.push(album)
        } else if(search){
            query += '  WHERE title LIKE ? OR genre LIKE ? OR topSongs LIKE?'
            const searchPattern = `%${search}%`
            params.push(searchPattern, searchPattern, searchPattern)
        }

        const products = await db.all(query, params)
        const normalized = products.map(product =>{
            let topSongs = []
            try{topSongs = JSON.parse(product.topSongs || '[]')}
            catch(err){
                console.log('failed to parse')
            }
            return { ...product, topSongs}
        })
        res.json(normalized)
    } catch (err){
            res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
}