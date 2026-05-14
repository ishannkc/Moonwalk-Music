import { logout } from './logout.js'
import { checkAuth, renderGreeting, showHideMenuItems } from './authUI.js'
import { getProducts, populateAlbumSelect } from './productService.js'
import { renderProducts, applySearchFilter } from './productUI.js'
import { updateCartIcon } from './cartService.js'

document.getElementById('logout-btn').addEventListener('click', logout)

// ===== Initial Load =====

async function init() {
  populateAlbumSelect()
  const products = await getProducts()
  const name = await checkAuth()
  renderGreeting(name)
  renderProducts(products)
  showHideMenuItems(name)
  if (name) {
    await updateCartIcon()
  }
}

init()


// ===== Event Listeners =====

document.getElementById('search-input').addEventListener('input', (e) => {
  e.preventDefault()
  applySearchFilter()
})

// prevent 'enter' from submitting
document.getElementById('search-input').addEventListener('submit', (e) => {
  e.preventDefault()
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  applySearchFilter() 
})

document.getElementById('genre-select').addEventListener('change', async (e) => {
  const album = e.target.value
  const products = await getProducts(album ? { album } : {})
  renderProducts(products)
})


 