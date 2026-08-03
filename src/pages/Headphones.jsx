import React, { useEffect, useState, useMemo } from 'react'
import ProductCat from '../components/ProductCat'
import Footer from '../components/Footer'
import { useGlobalContext } from '../context'

function Headphones() {
  const { products, productsLoading } = useGlobalContext()
  const [sortBy, setSortBy] = useState('price highest')
  const [show, setShow] = useState(false)
  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const sorted = useMemo(() => {
    const list = [...products]
    switch (sortBy) {
      case 'Price Highest':
        return list.sort((a, b) => b.price - a.price)
      case 'Price lowest':
        return list.sort((a, b) => a.price - b.price)
      case 'Lumens Highest':
        return list.sort((a, b) =>
          String(b.color_brightness || '').localeCompare(
            String(a.color_brightness || '')
          )
        )
      case 'Lumens lowest':
        return list.sort((a, b) =>
          String(a.color_brightness || '').localeCompare(
            String(b.color_brightness || '')
          )
        )
      default:
        return list
    }
  }, [products, sortBy])

  return (
    <>
      <header className='headHeader'>
        <h1>Products</h1>
      </header>
      <main className='headMain '>
        <section className='sorted'>
          <button>
            Sort By :
            <span onClick={() => setShow(true)} className='sortByShow'>
              {sortBy}
            </span>
            <svg
              className={`${show ? 'rot' : 'undefined'}`}
              width='10'
              height='7'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 6l4-4 4 4'
                stroke='#fff'
                strokeWidth='2'
                fill='none'
                fillRule='evenodd'
              />
            </svg>
          </button>

          {show && (
            <div className='menu-dropDown'>
              <ul onClick={() => setShow(false)}>
                <li onClick={() => setSortBy('Price Highest')}>
                  Price Highest
                </li>
                <li onClick={() => setSortBy('Price lowest')}>Price lowest</li>
                <li onClick={() => setSortBy('Lumens Highest')}>
                  Lumens Highest
                </li>
                <li onClick={() => setSortBy('Lumens lowest')}>
                  Lumens lowest
                </li>
              </ul>
            </div>
          )}
        </section>
        {productsLoading && <p className='loadingProducts'>Loading...</p>}
        {!productsLoading && sorted.length === 0 && (
          <p className='loadingProducts'>No products yet.</p>
        )}
        {sorted.map((prod, index) => (
          <ProductCat
            key={prod.id}
            id={prod.id}
            product={prod.product}
            feature={prod.feature}
            detail={prod.detail}
            price={prod.price}
            mainImage={prod.main_image}
            turn={index % 2 === 0}
          ></ProductCat>
        ))}
      </main>
      <Footer></Footer>
    </>
  )
}

export default Headphones
