// ===== Fetching products =====

export async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters)
  const res = await fetch(`/api/products?${queryParams}`)
  return await res.json()
}

// ===== Populate the genre dropdown =====

export async function populateAlbumSelect() {
  const res = await fetch('/api/products/albums')
  const albums = await res.json() // expects an array of genres as strings: ['rock', 'pop', ...]
  const select = document.getElementById('genre-select')

  albums.forEach(album => {
    const option = document.createElement('option')
    option.value = album
    option.textContent = album
    select.appendChild(option)
  })
}