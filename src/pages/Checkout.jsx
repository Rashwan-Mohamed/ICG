import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { resolveImage } from '../services/api'
import Thank from '../components/Thank'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

function buildWhatsAppMessage(enter, cartProducts, total) {
  const lines = [
    `New order from ${enter.sname}`,
    `Phone: ${enter.phone}`,
    `Email: ${enter.email}`,
    `Address: ${enter.address}, ${enter.city}, ${enter.country} ${enter.zip}`,
    '',
    'Items:',
    ...cartProducts.map(
      (p) => `- ${p.product} x${p.num} — ${p.price} EGB`
    ),
    '',
    `Total: ${total} EGB`,
  ]
  return lines.join('\n')
}

function Checkout() {
  const navigate = useNavigate()
  const { cart, products } = useGlobalContext()
  const [cartProducts, setcartProducts] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [thank, setThank] = useState(false)
  const [enter, setEnter] = useState({
    sname: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
  })
  const [messeage, setMessage] = useState(() => {
    let newl = {}

    for (let prop in enter) {
      newl[prop] = false
    }
    return newl
  })
  const getTotal = () => {
    let total = 0

    if (cartProducts.length >= 1) {
      cartProducts.forEach((item) => (total += item.price * item.num))
    }
    return total
  }
  useEffect(() => {
    let setl = []
    products.forEach((item) => {
      if (cart.length >= 1) {
        cart.forEach((cars) => {
          if (cars.id === item.id) {
            setl.push({ ...cars, ...item })
          }
        })
      }
    })
    setcartProducts(() => setl)
  }, [cart, products])

  let proceed
  const checkInpit = (sero, test) => {
    if (test) {
      setMessage((old) => {
        let news = { ...old }
        news[sero] = true
        return news
      })
      proceed = false
    } else {
      setMessage((old) => {
        let news = { ...old }
        news[sero] = false
        return news
      })
    }
  }
  const handleSubmit = (event) => {
    proceed = true
    setSubmitted(true)
    setThank(false)
    event.preventDefault()
    checkInpit('sname', enter.sname < 1)
    checkInpit('email', !enter.email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/))
    checkInpit('phone', !enter.phone.match(/^\+?\d{8,15}$/))
    checkInpit('address', !enter.address.match(/^[a-zA-Z0-9\s\-\,\.\']+$/))
    checkInpit('zip', !/^\d+$/.test(enter.zip))
    checkInpit('city', !/^\w+$/.test(enter.city))
    checkInpit('country', !/^\w+$/.test(enter.country))

    if (proceed) {
      if (!WHATSAPP_NUMBER) {
        console.warn(
          'VITE_WHATSAPP_NUMBER is not set — the WhatsApp order link will not work.'
        )
      }
      const total = getTotal()
      const message = buildWhatsAppMessage(enter, cartProducts, total)
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`
      window.open(waUrl, '_blank', 'noopener,noreferrer')
      setThank(true)
    }
  }
  useEffect(() => {
    if (submitted) {
      checkInpit('sname', enter.sname < 1)
      checkInpit('email', !enter.email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/))
      checkInpit('phone', !enter.phone.match(/^\+?\d{8,15}$/))
      checkInpit('address', !enter.address.match(/^[a-zA-Z0-9\s\-\,\.\']+$/))
      checkInpit('zip', !/^\d+$/.test(enter.zip))
      checkInpit('city', !/^\w+$/.test(enter.city))
      checkInpit('country', !/^\w+$/.test(enter.country))
    }
  }, [enter])
  useEffect(() => {
    if (thank) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [thank])
  return (
    <>
      <div className='checkoutWrapper'>
        {thank && (
          <Thank
            grand={getTotal()}
            cartProducts={cartProducts}
            setThank={setThank}
          ></Thank>
        )}
        <main className='checkoutMain'>
          <button onClick={() => navigate(-1)} className='goBack'>
            go back
          </button>
          <section className='fillForm'>
            <form
              id='mainForm'
              onSubmit={(event) => handleSubmit(event)}
              action=''
            >
              <h2>checkout</h2>
              <div className='billing'>
                <p>billing details</p>
                <div
                  className={
                    messeage.sname ? 'form-row formDanger' : 'form-row'
                  }
                >
                  {messeage.sname && (
                    <span className='SpanMessage'>please enter a number</span>
                  )}

                  <label htmlFor='name'>name</label>
                  <input
                    placeholder='your pretty name?'
                    type='text'
                    id='name'
                    name='name'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, sname: e.target.value }
                      })
                    }}
                    value={enter.sname}
                  />
                </div>
                <div
                  className={
                    messeage.email ? 'form-row formDanger' : 'form-row'
                  }
                >
                  {messeage.email && (
                    <span className='SpanMessage'>
                      please enter a valid email!
                    </span>
                  )}
                  <label htmlFor='email'>Email Address</label>
                  <input
                    placeholder='prettyName@hotmail.com'
                    type='text'
                    id='email'
                    name='email'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, email: e.target.value }
                      })
                    }}
                    value={enter.email}
                  />
                </div>
                <div
                  className={
                    messeage.phone ? 'form-row formDanger' : 'form-row'
                  }
                >
                  {messeage.phone && (
                    <span className='SpanMessage'>
                      please enter a valid mobile number
                    </span>
                  )}
                  <label htmlFor='Phone'>Phone Number</label>
                  <input
                    placeholder='+201234567891'
                    type='phone number'
                    id='Phone'
                    name='Phone'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, phone: e.target.value }
                      })
                    }}
                    value={enter.phone}
                  />
                </div>
              </div>
              <div className='shipping'>
                <p>Shipping info</p>
                <div
                  className={
                    messeage.address ? 'form-row formDanger' : 'form-row'
                  }
                >
                  {messeage.address && (
                    <span className='SpanMessage'>
                      please enter a valid <address></address>
                    </span>
                  )}
                  <label htmlFor='Address'>Address</label>
                  <input
                    placeholder='11 ANYWHERE'
                    type='Address'
                    id='Address'
                    name='Address'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, address: e.target.value }
                      })
                    }}
                    value={enter.address}
                  />
                </div>
                <div
                  className={messeage.zip ? 'form-row formDanger' : 'form-row'}
                >
                  {messeage.zip && (
                    <span className='SpanMessage'>
                      it must be a valid number! <address></address>
                    </span>
                  )}
                  <label htmlFor='Zip'>Zip Code</label>
                  <input
                    placeholder='11324'
                    type='text'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, zip: e.target.value }
                      })
                    }}
                    value={enter.zip}
                    id='Zip'
                    name='Zip'
                  />
                </div>
                <div
                  className={messeage.city ? 'form-row formDanger' : 'form-row'}
                >
                  {messeage.city && (
                    <span className='SpanMessage'>
                      provide city <address></address>
                    </span>
                  )}
                  <label htmlFor='City'>City</label>
                  <input
                    placeholder='Gotham'
                    type='City'
                    id='City'
                    name='City'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, city: e.target.value }
                      })
                    }}
                    value={enter.city}
                  />
                </div>
                <div
                  className={
                    messeage.country ? 'form-row formDanger' : 'form-row'
                  }
                >
                  {messeage.country && (
                    <span className='SpanMessage'>
                      provide country <address></address>
                    </span>
                  )}
                  <label htmlFor='Country'>Country</label>
                  <input
                    placeholder='Egypt'
                    type='text'
                    id='Country'
                    name='Country'
                    onChange={(e) => {
                      setEnter((old) => {
                        return { ...old, country: e.target.value }
                      })
                    }}
                    value={enter.country}
                  />
                </div>
              </div>
              <div className='payment'>
                <p>
                  We'll open WhatsApp with your order details pre-filled —
                  just hit send there to confirm with us.
                </p>
              </div>
            </form>
          </section>
          <section className='carto reviseDetails'>
            <ul className='disPro'>
              {cartProducts.length >= 1 &&
                cartProducts.map((item) => {
                  const { product, price, main_image, num, id } = item
                  return (
                    <li key={id}>
                      <img src={resolveImage(main_image)} alt={product} />
                      <span> {product}</span>
                      <span> {price} EGB</span>
                      <span>x{num}</span>
                    </li>
                  )
                })}
            </ul>
            {cartProducts.length >= 1 && (
              <>
                <h5>GRAND TOTAL</h5>
                <span>{getTotal()} EGB</span>
              </>
            )}

            <button
              type='submit'
              form='mainForm'
              onClick={() => {
                if (cartProducts.length >= 1) {
                  return
                } else {
                  navigate('/')
                }
              }}
              className={cartProducts.length < 1 ? 'seePro noItems' : 'seePro'}
            >
              {cartProducts.length < 1 ? 'back to purchase' : 'SEND ORDER VIA WHATSAPP'}
            </button>
          </section>
        </main>
      </div>
      <Footer className={'checkoutFooter'}></Footer>
    </>
  )
}

export default Checkout
