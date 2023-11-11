import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
// import { data } from '../data/CategoryData'
import { HEADPHONES as data } from '../data/CategoryData'
import SeeProduct from '../components/SeeProduct'
import Category from '../components/Category'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
import Toggle from '../components/Toggle'
import ProductCat from '../components/ProductCat'
import { useGlobalContext } from '../context'
function ProductPage() {
  const [product, setProduct] = useState(0)
  const [num, setNum] = useState(1)
  const [loading, setIsLoading] = useState(true)
  const location = useLocation().pathname
  const { amount, add, cart } = useGlobalContext()
  const [sel, setSelected] = useState(0)
  const [similar, setSimilar] = useState([])
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
    let Simadd = []
    data.forEach((pros) => {
      const { price: comp, id: ip } = pros
      console.log(ip !== theOne.id, ip === theOne.id)
      if (ip === theOne.id) return
      if (
        Math.abs(
          Number(comp.replace(/,/g, '')) -
            Number(theOne.price.replace(/,/g, ''))
        ) >= 1000 ||
        Math.abs(
          Number(comp.replace(/,/g, '')) -
            Number(theOne.price.replace(/,/g, ''))
        ) <= 3000
      ) {
        if (Simadd.length < 3) {
          Simadd.push(pros)
        }
      }
    })
    setSimilar(Simadd)
  }, [productID])
  const {
    product: name,
    productIMG,
    price,
    id,
    detail,
    gallery,
    Weight,
    Source,
    Resolution,
    Color_Brightness,
    White_Brightness,
    Contrast_Ratio,
    Portability,
    Model_Number,
    Light_Source_Life_Economy_Mode,
    Light_Source_Life_Normal_Mode,
    Aspect_Ratio,
    feature,
    Brand,
  } = product
  let seso = []
  // if (productIMG) {
  //   seso = productIMG.split('/')
  // }
  // useEffect(() => {
  //   let Simadd = []
  //   data.forEach((pros) => {
  //     const { price: comp } = pros
  //     console.log(Math.abs(comp - price), comp, price)
  //     if (Math.abs(comp - price) <= 3000) {
  //       Simadd.push(pros)
  //     }
  //   })
  //   setSimilar(Simadd)
  //   console.log(similar, Simadd, 'similar')
  // }, [productID])
  if (loading) return <h1>Loading...</h1>
  return (
    <>
      <main className='productPage'>
        <button onClick={() => navigate(-1)} className='goBack'>
          go back
        </button>

        <section className='ProductCat '>
          <article className='gallary'>
            <div className='viewed'>
              {gallery.map((galArr, index) => {
                const [src] = galArr
                return (
                  <img
                    key={index}
                    className={sel === index ? `yes notYou` : `notYou`}
                    src={`../src/assets/${src}`}
                    alt=''
                  />
                )
              })}
            </div>
            <div className='other'>
              {gallery.map((galArr, index) => {
                const [src] = galArr
                return (
                  <img
                    onMouseEnter={() => {
                      setSelected(index)
                    }}
                    onTouchStart={() => {
                      setSelected(index)
                    }}
                    key={index}
                    src={`../src/assets/${src}`}
                    alt=''
                  />
                )
              })}
            </div>
          </article>
          <article className='details'>
            <h1>{detail}</h1>
            <span className='spanPrice'>{price}</span>
            <h3>Product Details:</h3>
            <ul>
              <li>Brand name: {Brand} </li>
              <li>Model: {Model_Number}</li>
              <li>Source: {Source}</li>
              <li>Resolution: {Resolution}</li>
              <li>Weight: {Weight}</li>
              <li>Color Brightness: {Color_Brightness}</li>
              <li>Contrast Ratio: {Contrast_Ratio}</li>
              <li>
                Light Source Life Economy Mode: {Light_Source_Life_Economy_Mode}
              </li>
              <li>
                Light Source Life Normal Mode: {Light_Source_Life_Normal_Mode}
              </li>
              <li>Aspect Ratio: {Aspect_Ratio}</li>
            </ul>
          </article>
        </section>
        {/* <section className='moreInfo MaxWrapper'>
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
        </section> */}
        {/* <section className='gallary MaxWrapper'>
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
        </section> */}
        {/* <section className='mayAlos MaxWrapper'>
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
        </section> */}
        {/* <Category></Category> */}
        {/* <Bringing></Bringing> */}
        <section className='mayAlos'>
          <h2>Similar Products</h2>
          {similar.map((prod, index) => {
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
              id,
            } = prod

            return (
              <ProductCat
                key={id}
                product={product}
                feature={feature}
                detail={detail}
                label={label}
                alt={alt}
                place={productIMG}
                price={price}
                link={link}
                turn={index % 2 == 0}
              ></ProductCat>
            )
          })}
        </section>
      </main>
      <Footer></Footer>
    </>
  )
}

export default ProductPage
