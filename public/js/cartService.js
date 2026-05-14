const CART_KEY = 'moonwalk_cart'

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

function normalizeId(value) {
  return String(value)
}

export function updateCartIcon() {
  const label = document.querySelector('.cart-label')
  if (!label) return
  const items = getCart()
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  label.textContent = count ? `Cart (${count})` : 'Cart'
}

export function addBtnListeners() {
  const buttons = document.querySelectorAll('.add-btn')
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card')
      if (!card) return

      const id = normalizeId(btn.dataset.id)
      const title = card.querySelector('h2')?.textContent?.trim() || 'Album'
      const artist = card.querySelector('h3')?.textContent?.trim() || ''
      const priceText = card.querySelector('p')?.textContent?.replace('$', '').trim()
      const price = Number(priceText) || 0
      const imageSrc = card.querySelector('img')?.getAttribute('src') || ''
      const image = imageSrc.replace('./images/', '')

      const items = getCart()
      const existing = items.find(item => item.id === id)

      if (existing) {
        existing.qty += 1
      } else {
        items.push({ id, title, artist, price, image, qty: 1 })
      }

      saveCart(items)
      updateCartIcon()
    })
  })
}

export function loadCart(dom) {
  const items = getCart()
  const cartCount = document.getElementById('cart-count')
  const cartSubtotal = document.getElementById('cart-subtotal')

  if (!items.length) {
    if (dom.cartList) dom.cartList.innerHTML = ''
    if (cartCount) cartCount.textContent = '0 Items'
    if (cartSubtotal) cartSubtotal.textContent = '$0.00'
    if (dom.cartTotal) dom.cartTotal.textContent = '$0.00'
    return
  }

  const listHtml = items.map(item => {
    const lineTotal = item.price * item.qty
    const meta = item.artist ? `${item.artist} - Qty ${item.qty}` : `Qty ${item.qty}`

    return `
      <li class="cart-item">
        <img src="./images/${item.image}" alt="${item.title}">
        <div>
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-meta">${meta}</div>
          <button class="cart-item-remove remove-btn" data-id="${item.id}">Remove</button>
        </div>
        <div class="cart-item-price">$${lineTotal.toFixed(2)}</div>
      </li>
    `
  }).join('')

  if (dom.cartList) dom.cartList.innerHTML = listHtml

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  if (cartCount) cartCount.textContent = `${items.length} Items`
  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
  if (dom.cartTotal) dom.cartTotal.textContent = `$${subtotal.toFixed(2)}`
}

export function removeItem(id, dom) {
  const items = getCart().filter(item => item.id !== normalizeId(id))
  saveCart(items)
  loadCart(dom)
}

export function removeAll(dom) {
  saveCart([])
  loadCart(dom)
}