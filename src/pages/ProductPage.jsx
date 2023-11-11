import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import data from '../data/product-data.json'
import SeeProduct from '../components/SeeProduct'
import Category from '../components/Category'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
import Toggle from '../components/Toggle'
import { useGlobalContext } from '../context'
function ProductPage() {
  const [product, setProduct] = useState(0)
  const [num, setNum] = useState(1)
  const [loading, setIsLoading] = useState(true)
  const location = useLocation().pathname
  const { amount, add, cart } = useGlobalContext()
  useEffect(() => {
    setNum(1)
  }, [location])
  const navigate = useNavigate()
  let productID = useParams().id
  useEffect(() => {
    let theOne = data.find((obk) => obk.id === productID)
    setProduct(theOne)
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [productID])
  const {
    product: name,
    productIMG,
    price,
    info,
    inTheBox,
    id,
    gallery,
    featureDesc1,
    featureDesc2,
    feature,
    cartImg,
    preference,
  } = product
  let seso = []
  if (productIMG) {
    seso = productIMG.split('/')
  }
  if (loading) return <h1>Loading...</h1>
  return (
    <>
      <main className='productPage'>
        <button onClick={() => navigate(-1)} className='goBack'>
          go back
        </button>

        <section className='ProductCat MaxWrapper'>
          <picture>
            <source
              media='(min-width:1024px)'
              srcSet={`/assets/${seso[0]}/desktop/${seso[2]}`}
            />
            <source
              media='(min-width:770px)'
              srcSet={`/assets/${seso[0]}/tablet/${seso[2]}`}
            />
            <source
              media='(max-width:769px)'
              srcSet={`/assets/${seso[0]}/mobile/${seso[2]}`}
            />
            <img src={`assets/${seso[0]}/desktop/${seso[2]}`} alt={name} />
          </picture>
          <article className='details'>
            <p className='desc'>{feature}</p>
            <h1>{name}</h1>
            <p className='paraDetail'>{info}</p>
            <span className='spanPrice'>$ {price}</span>
            <div>
              <div className='addMore'>
                <button
                  onClick={() => {
                    if (num !== 1) {
                      setNum(num - 1)
                    }
                  }}
                >
                  -
                </button>
                {num}
                <button onClick={() => setNum(num + 1)}>+</button>
              </div>
              <button
                onClick={() => {
                  add(id, num)
                }}
                className='toCart seePro'
              >
                add to cart
              </button>
            </div>
          </article>
        </section>
        <section className='moreInfo MaxWrapper'>
          <div>
            <h4>feature</h4>
            <p>{featureDesc1}</p>
            <p>{featureDesc2}</p>
          </div>
          <div>
            <h4>in the box</h4>
            <ul>
              {inTheBox.map((box) => {
                return (
                  <li key={box[1]}>
                    <span>{box[0]}</span>
                    <span>{box[1]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className='gallary MaxWrapper'>
          {gallery.map((arr) => {
            let rero = arr[0].split('/')
            return (
              <picture key={arr[0]}>
                <source
                  srcSet={`/assets/${rero[0]}/desktop/${rero[2]}`}
                  media='(min-width:1024px)'
                />
                <source
                  srcSet={`/assets/${rero[0]}/tablet/${rero[2]}`}
                  media='(min-width:521px)'
                />
                <source
                  srcSet={`/assets/${rero[0]}/mobile/${rero[2]}`}
                  media='(max-width:520px)'
                />
                <img src={`/assets/${rero[0]}/desktop/${rero[2]}`} alt={name} />
              </picture>
            )
          })}
        </section>
        <section className='mayAlos MaxWrapper'>
          <h2>you may also like</h2>
          {preference.map((pro) => {
            const { alt, link, product, url } = pro
            let rero = url.split('/')
            return (
              <article key={url}>
                <picture>
                  <source
                    srcSet={`/assets/${rero[0]}/desktop/${rero[2]}`}
                    media='(min-width:1024px)'
                  />
                  <source
                    srcSet={`/assets/${rero[0]}/tablet/${rero[2]}`}
                    media='(min-width:521px)'
                  />
                  <source
                    srcSet={`/assets/${rero[0]}/mobile/${rero[2]}`}
                    media='(max-width:520px)'
                  />
                  <img
                    src={`/assets/${rero[0]}/desktop/${rero[2]}`}
                    alt={alt}
                  />
                </picture>
                <h3>{product}</h3>
                <SeeProduct where={link} sases={'seeProduct'}></SeeProduct>
              </article>
            )
          })}
        </section>
        <Category></Category>
        <Bringing></Bringing>
      </main>
      <Footer></Footer>
    </>
  )
}

export default ProductPage
