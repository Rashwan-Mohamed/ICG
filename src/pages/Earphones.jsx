import React, { useEffect } from 'react'
// import { EARPHONES } from '../data/CategoryData'
import ProductCat from '../components/ProductCat'
import Category from '../components/Category'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
function Earphones() {
  useEffect(() => {
    scrollTo(0, 0)
  }, [])
  return (
    <>
      <header className='headHeader'>
        <h1>earphones</h1>
      </header>
      <main className='headMain'>
        {/* {EARPHONES.map((prod, index) => {
          const { product, feature, detail, label, alt, src, price, link } =
            prod
          return (
            <ProductCat
              key={product}
              product={product}
              feature={feature}
              detail={detail}
              label={label}
              alt={alt}
              place={src}
              price={price}
              link={link}
              turn={index % 2 == 0}
            ></ProductCat>
          )
        })} */}
        <Category></Category>
        <Bringing></Bringing>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Earphones
