import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { resolveImage } from '../services/api'
import Toggle from './Toggle'
function Cart({ setCartShow, bad }) {
  const { cart, removeAll, products } = useGlobalContext()
  const [cartProducts, setcartProducts] = useState([])
  const navigate = useNavigate()
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

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !detectClose.current.contains(e.target) &&
        !bad.current.contains(e.target)
      )
        setCartShow(false)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const detectClose = useRef(0)

  return (
    <section className='cartOverlay'>
      <div className='cartWrapper'>
        <div ref={detectClose} className='carto'>
          <h4>Cart ({cart.length})</h4>
          <button onClick={() => removeAll()}>remove all</button>
          <ul className='disPro'>
            {cartProducts.length >= 1 &&
              cartProducts.map((item) => {
                const { product, price, main_image, num, id } = item
                return (
                  <li key={id}>
                    <img src={resolveImage(main_image)} alt={product} />
                    <span> {product}</span>
                    <span> {price} EGB</span>
                    <Toggle amount={num} id={id}></Toggle>
                  </li>
                )
              })}
            {cartProducts.length < 1 && (
              <>
                <div
                  className='doggy'
                  style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '63%',
                    position: 'relative',
                  }}
                >
                  <iframe
                    src='https://giphy.com/embed/CIJsP7PsWvZM4'
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute' }}
                    frameBorder='0'
                    className='giphy-embed'
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            )}
          </ul>
          <h5>total</h5>
          <span>{getTotal()} EGB</span>
          <button
            onClick={() => {
              if (cartProducts.length >= 1) {
                navigate('/checkout')
                setCartShow(false)
              }
            }}
            className={cartProducts.length < 1 ? 'seePro noItems' : 'seePro'}
          >
            {cartProducts.length < 1 ? 'no items in the list' : 'CHECKOUT'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart
