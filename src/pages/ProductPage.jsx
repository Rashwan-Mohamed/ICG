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
  const { amount, add, cart, lang } = useGlobalContext()
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
          العودة
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
                    src={`../assets/${src}`}
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
                    src={`../assets/${src}`}
                    alt=''
                  />
                )
              })}
            </div>
          </article>
          <article className='details'>
            <h1>{detail}</h1>
            <span className='spanPrice'>{price}</span>
            <h3>{lang ? 'تفاصيل المنتج:' : 'Product Details:'}</h3>
            <ul>
              <li>
                {lang
                  ? `اسم العلامة التجارية: ${Brand}`
                  : `Brand name: ${Brand}`}
              </li>
              <li>
                {lang ? `النموذج: ${Model_Number}` : `Model: ${Model_Number}`}
              </li>
              <li>{lang ? `المصدر: ${Source}` : `Source: ${Source}`}</li>
              <li>
                {lang ? `الدقة: ${Resolution}` : `Resolution: ${Resolution}`}
              </li>
              <li>{lang ? `الوزن: ${Weight}` : `Weight: ${Weight}`}</li>
              <li>
                {lang
                  ? `سطوع الألوان: ${Color_Brightness}`
                  : `Color Brightness: ${Color_Brightness}`}
              </li>
              <li>
                {lang
                  ? `نسبة التباين: ${Contrast_Ratio}`
                  : `Contrast Ratio: ${Contrast_Ratio}`}
              </li>
              <li>
                {lang
                  ? `عمر مصدر الضوء في وضع الاقتصاد: ${Light_Source_Life_Economy_Mode}`
                  : `Light Source Life Economy Mode: ${Light_Source_Life_Economy_Mode}`}
              </li>
              <li>
                {lang
                  ? `عمر مصدر الضوء في وضع العادي: ${Light_Source_Life_Normal_Mode}`
                  : `Light Source Life Normal Mode: ${Light_Source_Life_Normal_Mode}`}
              </li>
              <li>
                {lang
                  ? `نسبة العرض: ${Aspect_Ratio}`
                  : `Aspect Ratio: ${Aspect_Ratio}`}
              </li>
            </ul>
          </article>
        </section>

        {/* Rest of the component remains unchanged for brevity. */}

        <section className='mayAlos'>
          <h2>{lang ? 'منتجات مماثلة' : 'Similar Products'}</h2>
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
                turn={index % 2 === 0}
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
