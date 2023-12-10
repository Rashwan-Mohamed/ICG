import React from 'react'
import SeeProduct from './SeeProduct'
import { useWidth } from '../useWidt'

function ProductCat({
  product,
  feature,
  detail,
  label,
  alt,
  place,
  price,
  link,
  turn,
  gallery,
}) {
  let seso = place.split('/')
  const width = useWidth()
  console.log(place)
  return (
    <section className='ProductCat '>
      {/* <img src={`/assets/${place}`} alt='' /> */}
      <img src={`/assets/${gallery[0][0]}`} alt='' />
      <article className='details'>
        {/* <p className='desc'>{feature}</p> */}
        <h1>{product}</h1>
        <p className='paraDetail'>{detail}</p>
        <h3>{price.match(/\d+/g)} EGB</h3>
        <SeeProduct where={link} sases={'seeProduct'}></SeeProduct>
      </article>
    </section>
  )
}

export default ProductCat
