import { getDBConnection } from "../db/db.js";


export async function addtoCart(req, res){
    const db = await getDBConnection()

    const albumId = parseInt(req.body.albumId, 10)

    if(isNaN(albumId)){
        return res.status(400).json({error: 'Invalid Album ID'})
    }

    const userId = req.session.userId

    const existing = await db.get(`SELECT * FROM cart_items
                WHERE user_id=? 
                AND album_id=?
        `,[userId, albumId]
    )

    if(existing){
        await db.run(`
                UPDATE cart_items SET
                quantity = quantity +1
                WHERE id=?
            `,[existing.id]
        )
    } else {
        await db.run(`
                INSERT INTO cart_items(user_id, album_id, quantity)
                VALUES(?,?,1)
            `,[userId, albumId]
        )
    }

    res.json({message: 'Added to cart'})
    console.log('Added item to cart')
}

