import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { resolveImage } from '../services/api'

function ProductCat({ id, product, detail, price, mainImage }) {
  const { lang } = useGlobalContext()
  return (
    <Link to={`/product_detail/${id}`} className='productCard'>
      <div className='cardImage'>
        <img src={resolveImage(mainImage)} alt={product} />
      </div>
      <article className='cardBody'>
        <h1>{product}</h1>
        <p className='paraDetail'>{detail}</p>
        <h3>{price} EGB</h3>
        <span className='seePro'>
          {lang ? 'رؤية المنتج' : 'SEE PRODUCT'}
        </span>
      </article>
    </Link>
  )
}

export default ProductCat
