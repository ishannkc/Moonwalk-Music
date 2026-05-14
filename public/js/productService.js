// ===== Fetching products =====

export async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters)
  const res = await fetch(`/api/products?${queryParams}`)
  return await res.json()
}

// ===== Populate the genre dropdown =====

export async function populateEraSelect() {
  const res = await fetch('/api/products/eras')
  const eras = await res.json() // expects an array of eras as strings
  const select = document.getElementById('genre-select')

  eras.forEach(era => {
    const option = document.createElement('option')
    option.value = era
    option.textContent = era
    select.appendChild(option)
  })
}