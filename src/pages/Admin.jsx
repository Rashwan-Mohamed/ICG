import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { resolveImage } from '../services/api'
import {
  getToken,
  setToken,
  clearToken,
  login,
  logout,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
} from '../services/api'

const FIELDS = [
  { name: 'product', label: 'Product name', required: true },
  { name: 'brand', label: 'Brand' },
  { name: 'feature', label: 'Feature / badge' },
  { name: 'model_number', label: 'Model number' },
  { name: 'resolution', label: 'Resolution' },
  { name: 'color_brightness', label: 'Color brightness' },
  { name: 'white_brightness', label: 'White brightness' },
  { name: 'contrast_ratio', label: 'Contrast ratio' },
  { name: 'source', label: 'Light source' },
  { name: 'weight', label: 'Weight' },
  { name: 'portability', label: 'Portability' },
  { name: 'aspect_ratio', label: 'Aspect ratio' },
  {
    name: 'light_source_life_economy_mode',
    label: 'Lamp life (economy mode)',
  },
  {
    name: 'light_source_life_normal_mode',
    label: 'Lamp life (normal mode)',
  },
  { name: 'min_projector_distance', label: 'Min projector distance' },
  { name: 'max_projector_distance', label: 'Max projector distance' },
  { name: 'min_viewable_screen_size', label: 'Min screen size' },
  { name: 'max_viewable_screen_size', label: 'Max screen size' },
]

const emptyForm = FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.name]: '' }),
  { price: '', detail: '' }
)

function Admin() {
  const [token, setTok] = useState(getToken())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [mainImageFile, setMainImageFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [saving, setSaving] = useState(false)

  const reload = () => {
    setLoading(true)
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (token) reload()
  }, [token])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const { token: newToken } = await login(username, password)
      setToken(newToken)
      setTok(newToken)
    } catch (err) {
      setLoginError(err.message)
    }
  }

  const handleLogout = async () => {
    try {
      await logout(token)
    } catch {
      // ignore — clearing the local token is enough either way
    }
    clearToken()
    setTok(null)
    setProducts([])
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setMainImageFile(null)
    setGalleryFiles([])
  }

  const startEdit = (product) => {
    setEditingId(product.id)
    setForm({
      ...emptyForm,
      ...Object.fromEntries(
        Object.keys(emptyForm).map((key) => [key, product[key] ?? ''])
      ),
    })
    setMainImageFile(null)
    setGalleryFiles([])
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(id, token)
      reload()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteProductImage(imageId, token)
      reload()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => data.set(key, value))
    if (mainImageFile) data.set('main_image', mainImageFile)
    galleryFiles.forEach((file) => data.append('gallery[]', file))

    try {
      if (editingId) {
        await updateProduct(editingId, data, token)
      } else {
        await createProduct(data, token)
      }
      resetForm()
      reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!token) {
    return (
      <main className='adminWrapper'>
        <form className='adminLogin' onSubmit={handleLogin}>
          <h1>Admin login</h1>
          {loginError && <p className='SpanMessage'>{loginError}</p>}
          <label htmlFor='admin-username'>Username</label>
          <input
            id='admin-username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='admin-password'>Password</label>
          <input
            id='admin-password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='seePro' type='submit'>
            Log in
          </button>
        </form>
      </main>
    )
  }

  return (
    <>
      <main className='adminWrapper'>
        <div className='adminHeader'>
          <h1>Admin — Products</h1>
          <button className='seePro' onClick={handleLogout}>
            Log out
          </button>
        </div>

        {error && <p className='SpanMessage'>{error}</p>}

        <form className='adminForm' onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit product' : 'Add product'}</h2>

          <label htmlFor='f-price'>Price (EGB)</label>
          <input
            id='f-price'
            type='number'
            step='0.01'
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />

          {FIELDS.map(({ name, label, required }) => (
            <React.Fragment key={name}>
              <label htmlFor={`f-${name}`}>{label}</label>
              <input
                id={`f-${name}`}
                type='text'
                required={required}
                value={form[name]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [name]: e.target.value }))
                }
              />
            </React.Fragment>
          ))}

          <label htmlFor='f-detail'>Description</label>
          <textarea
            id='f-detail'
            rows={4}
            value={form.detail}
            onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
          />

          <label htmlFor='f-main-image'>Main image</label>
          <input
            id='f-main-image'
            type='file'
            accept='image/*'
            onChange={(e) => setMainImageFile(e.target.files[0] || null)}
          />

          <label htmlFor='f-gallery'>Gallery images (adds to existing)</label>
          <input
            id='f-gallery'
            type='file'
            accept='image/*'
            multiple
            onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
          />

          {editingId && (
            <div className='adminGalleryPreview'>
              {products
                .find((p) => p.id === editingId)
                ?.gallery.map((img) => (
                  <div key={img.id} className='adminGalleryItem'>
                    <img src={resolveImage(img.image_path)} alt='' />
                    <button
                      type='button'
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      remove
                    </button>
                  </div>
                ))}
            </div>
          )}

          <div className='adminFormActions'>
            <button className='seePro' type='submit' disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add product'}
            </button>
            {editingId && (
              <button type='button' onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <h2>Existing products {loading && '(loading…)'}</h2>
        <ul className='adminProductList'>
          {products.map((p) => (
            <li key={p.id} className='adminProductRow'>
              <img src={resolveImage(p.main_image)} alt={p.product} />
              <span className='adminProductName'>{p.product}</span>
              <span>{p.price} EGB</span>
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Admin
