import { getDBConnection } from "../db/db.js"

async function viewAllProducts() {
    const db = await getDBConnection()

  try { 
    const products = await db.all('SELECT * FROM albums')
    // Neater table display
    const displayItems = products.map(({ id, title, price, year,genre, stock, topSongs }) => {
      let songs = topSongs
      try{
        songs = JSON.parse(topSongs).join(' | ')
      } catch(err){
          console.log('Error parsing topSongs: ', err.message)
      }
      return { id, title, price, year,genre, stock, topSongs: songs }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

viewAllProducts()