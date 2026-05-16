async function requestJson(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  return { ok: res.ok, status: res.status, data }
}

export async function updateCartIcon() {
  const label = document.querySelector('.cart-label')
  if (!label) return

  const result = await requestJson('/api/cart/cart-count')
  if (!result || !result.ok) {
    label.textContent = 'Cart'
    return
  }

  const count = result.data?.totalItems || 0
  label.textContent = count ? `Cart (${count})` : 'Cart'
}

export function addBtnListeners() {
  const buttons = document.querySelectorAll('.add-btn')
  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const card = btn.closest('.product-card')
      if (!card) return

      const albumId = Number(btn.dataset.id)
      if (Number.isNaN(albumId)) return

      const result = await requestJson('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ albumId })
      })

      if (!result || !result.ok) {
        console.warn('Failed to add to cart', result?.status)
        return
      }

      await updateCartIcon()
    })
  })
}

export async function loadCart(dom) {
  const result = await requestJson('/api/cart')
  const cartCount = document.getElementById('cart-count')
  const cartSubtotal = document.getElementById('cart-subtotal')

  if (!result || !result.ok) {
    if (dom.cartList) dom.cartList.innerHTML = ''
    if (cartCount) cartCount.textContent = '0 Items'
    if (cartSubtotal) cartSubtotal.textContent = '$0.00'
    if (dom.cartTotal) dom.cartTotal.textContent = '$0.00'
    return
  }

  const items = result.data?.items || []

  if (!items.length) {
    if (dom.cartList) dom.cartList.innerHTML = ''
    if (cartCount) cartCount.textContent = '0 Items'
    if (cartSubtotal) cartSubtotal.textContent = '$0.00'
    if (dom.cartTotal) dom.cartTotal.textContent = '$0.00'
    return
  }

  const listHtml = items.map(item => {
    const lineTotal = item.price * item.quantity
    const meta = item.artist ? `${item.artist} - Qty ${item.quantity}` : `Qty ${item.quantity}`
    const image = item.image || ''

    return `
      <li class="cart-item">
        <img src="./images/${image}" alt="${item.title}">
        <div>
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-meta">${meta}</div>
          <button class="cart-item-remove remove-btn" data-id="${item.cartItemId}">Remove</button>
        </div>
        <div class="cart-item-price">$${lineTotal.toFixed(2)}</div>
      </li>
    `
  }).join('')

  if (dom.cartList) dom.cartList.innerHTML = listHtml

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (cartCount) cartCount.textContent = `${items.length} Items`
  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
  if (dom.cartTotal) dom.cartTotal.textContent = `$${subtotal.toFixed(2)}`
}

export async function removeItem(id, dom) {
  const itemId = Number(id)
  if (Number.isNaN(itemId)) return

  await requestJson(`/api/cart/${itemId}`, { method: 'DELETE' })
  await loadCart(dom)
  await updateCartIcon()
}

export async function removeAll(dom) {
  await requestJson('/api/cart/all', { method: 'DELETE' })
  await loadCart(dom)
  await updateCartIcon()
}