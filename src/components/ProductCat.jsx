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
}) {
  let seso = place.split('/')
  const width = useWidth()
  console.log(place)
  return (
    <section className='ProductCat '>
      {/* {(turn || width < 768) && (
        <picture>
          <source
            media='(min-width:768px)'
            srcSet={`/assets/${seso[0]}/desktop/${seso[2]}`}
          />
          <source
            media='(min-width:521px)'
            srcSet={`/assets/${seso[0]}/tablet/${seso[2]}`}
          />
          <source
            media='(max-width:520px)'
            srcSet={`/assets/${seso[0]}/mobile/${seso[2]}`}
          />
          <img src={`/assets/${seso[0]}/desktop/${seso[2]}`} alt={alt} />
        </picture>
      )} */}
      <img src={`/assets/${place}`} alt='' />
      <article className='details'>
        <p className='desc'>{feature}</p>
        <h1>{product}</h1>
        <p className='paraDetail'>{detail}</p>
        <h3>{price}</h3>
        <SeeProduct where={link} sases={'seeProduct'}></SeeProduct>
      </article>

      {/* {!turn && width > 768 && (
        <picture>
          <source
            media='(min-width:768px)'
            srcSet={`/assets/${seso[0]}/desktop/${seso[2]}`}
          />
          <source
            media='(min-width:521px)'
            srcSet={`/assets/${seso[0]}/tablet/${seso[2]}`}
          />
          <source
            media='(max-width:520px)'
            srcSet={`/assets/${seso[0]}/mobile/${seso[2]}`}
          />
          <img src={`/assets/${seso[0]}/desktop/${seso[2]}`} alt={alt} />
        </picture>
      )} */}
    </section>
  )
}

export default ProductCat
