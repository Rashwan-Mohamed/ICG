import React from 'react'
import SeeProduct from './SeeProduct'
import { resolveImage } from '../services/api'

function ProductCat({ id, product, feature, detail, price, mainImage, turn }) {
  return (
    <section className='ProductCat '>
      <img src={resolveImage(mainImage)} alt={product} />
      <article className='details'>
        {/* <p className='desc'>{feature}</p> */}
        <h1>{product}</h1>
        <p className='paraDetail'>{detail}</p>
        <h3>{price} EGB</h3>
        <SeeProduct
          where={`/product_detail/${id}`}
          sases={'seeProduct'}
        ></SeeProduct>
      </article>
    </section>
  )
}

export default ProductCat
