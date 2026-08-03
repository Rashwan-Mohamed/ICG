const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost/backend'
).replace(/\/$/, '')

const TOKEN_KEY = 'icg_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Legacy seeded products store the local asset path (e.g.
// "icg/products/xyz.jpg"); admin-uploaded products store a full backend URL.
export function resolveImage(path) {
  if (!path) return ''
  return path.startsWith('http') ? path : `/assets/${path}`
}

async function request(path, { method = 'GET', body, token, isForm } = {}) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (body && !isForm) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }

  return data
}

export function fetchProducts() {
  return request('/api/products.php')
}

export function fetchProduct(id) {
  return request(`/api/products.php?id=${encodeURIComponent(id)}`)
}

export function login(username, password) {
  return request('/api/login.php', {
    method: 'POST',
    body: { username, password },
  })
}

export function logout(token) {
  return request('/api/logout.php', { method: 'POST', token })
}

export function createProduct(formData, token) {
  return request('/api/products.php', {
    method: 'POST',
    body: formData,
    isForm: true,
    token,
  })
}

export function updateProduct(id, formData, token) {
  formData.set('id', id)
  formData.set('_method', 'PUT')
  return request('/api/products.php', {
    method: 'POST',
    body: formData,
    isForm: true,
    token,
  })
}

export function deleteProduct(id, token) {
  return request(`/api/products.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  })
}

export function deleteProductImage(imageId, token) {
  return request(`/api/product_image.php?id=${encodeURIComponent(imageId)}`, {
    method: 'DELETE',
    token,
  })
}
