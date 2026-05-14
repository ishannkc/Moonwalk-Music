import { getDBConnection } from '../db/db.js'

export async function getEras(req, res){
    try{
            const db = await getDBConnection()

            const eraRows = await db.all (`SELECT DISTINCT era FROM albums`)
            const eras = eraRows.map(row=>row.era)
            res.json(eras)
            // console.log('era got')
    } catch(err){
        console.log('failed to get eras: ', err.message)
        res.status(500).json({error: 'Failed to fetch eras', details: err.message})
        
    }
}

export async function getProducts(req, res){
    try{
        const db  = await getDBConnection()

        let query = `SELECT * FROM albums`
        let params = []

        const {era, search} = req.query

        if(era){
            query +=' WHERE era = ?'
            params.push(era)
        } else if(search){
            query += '  WHERE title LIKE ? OR genre LIKE ? OR topSongs LIKE? OR era LIKE?'
            const searchPattern = `%${search}%`
            params.push(searchPattern, searchPattern, searchPattern, searchPattern)
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