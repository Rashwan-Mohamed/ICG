import React, { useEffect, useState } from 'react'
import { HEADPHONES } from '../data/CategoryData'
import ProductCat from '../components/ProductCat'
import Category from '../components/Category'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
function Headphones() {
  const [sortBy, setSortBy] = useState('price highest')
  const [show, setShow] = useState(false)
  useEffect(() => {
    scrollTo(0, 0)
  }, [])

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
        {HEADPHONES.map((prod, index) => {
          const {
            product,
            feature,
            detail,
            label,
            alt,
            src,
            price,
            link,
            productIMG,
            gallery,
          } = prod
          console.log(Number(price.match(/\d+/g)));
          return (
            <ProductCat
              key={product}
              product={product}
              feature={feature}
              detail={detail}
              label={label}
              alt={alt}
              place={productIMG}
              price={price}
              link={link}
              turn={index % 2 == 0}
              gallery={gallery}
            ></ProductCat>
          )
        })}
      </main>
      {/* <Category></Category> */}
      {/* <Bringing></Bringing> */}
      <Footer></Footer>
    </>
  )
}

export default Headphones
