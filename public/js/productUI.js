import { addBtnListeners } from './cartService.js'
import { getProducts } from './productService.js'

// ===== Rendering products =====


export function renderProducts(products) {
  const albumsContainer = document.getElementById('products-container')
  const cards = products.map((album) => {
    const songsList = (album.topSongs || []).map(song => `<li>${song}</li>`).join('')
    return `
      <div class="product-card">
        <img src="./images/${album.image}" alt="${album.title}">
        <h2>${album.title}</h2>
        <p class = 'album-year'>${album.year}</p>
        <p>$${album.price}</p>
        <p class = 'title-top-songs'>Top Songs</p>
        <ul class="top-songs">${songsList}</ul>
        <button class="main-btn add-btn" data-id="${album.id}">Add to Cart</button>
      </div>
    `
  }).join('')

  albumsContainer.innerHTML = cards
  addBtnListeners()
}

// ===== Handling filtering =====

export async function applySearchFilter() {
  const search = document.getElementById('search-input').value.trim()
  const filters = {}
  if (search) filters.search = search
  const products = await getProducts(filters)
  renderProducts(products)
}