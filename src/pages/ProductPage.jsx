import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import ProductCat from '../components/ProductCat'
import { useGlobalContext } from '../context'
import { useWidth } from '../useWidt'
import { resolveImage } from '../services/api'

function ProductPage() {
  const [num, setNum] = useState(1)
  const location = useLocation().pathname
  const { add, lang, products, productsLoading } = useGlobalContext()
  const [sel, setSelected] = useState(0)
  const width = useWidth()
  useEffect(() => {
    setNum(1)
    setSelected(0)
    window.scrollTo(0, 0)
  }, [location])
  const navigate = useNavigate()
  const productID = Number(useParams().id)

  const product = products.find((p) => p.id === productID)

  const similar = product
    ? products
        .filter(
          (p) =>
            p.id !== product.id &&
            Math.abs(Number(p.price) - Number(product.price)) <= 500
        )
        .slice(0, 3)
    : []

  if (productsLoading) {
    return (
      <header className='headHeader'>
        <h1>Loading...</h1>
      </header>
    )
  }
  if (!product) {
    return (
      <header className='headHeader'>
        <h1>Product not found</h1>
      </header>
    )
  }

  const {
    product: name,
    price,
    detail,
    gallery,
    weight,
    source,
    resolution,
    color_brightness,
    contrast_ratio,
    model_number,
    light_source_life_economy_mode,
    light_source_life_normal_mode,
    aspect_ratio,
    brand,
  } = product

  const specs = (
    <ul
      style={{
        textAlign: lang ? 'right' : 'left',
        alignSelf: lang ? 'flex-end' : 'flex-start',
      }}
    >
      <li dir='rtl'>
        {lang ? `اسم العلامة التجارية: ${brand}` : `Brand name: ${brand}`}
      </li>
      <li dir='rtl'>
        {lang ? `النموذج: ${model_number}` : `Model: ${model_number}`}
      </li>
      <li dir='rtl'>{lang ? `المصدر: ${source}` : `Source: ${source}`}</li>
      <li dir='rtl'>
        {lang ? `الدقة: ${resolution}` : `Resolution: ${resolution}`}
      </li>
      <li dir='rtl'>{lang ? `الوزن: ${weight}` : `Weight: ${weight}`}</li>
      <li dir='rtl'>
        {lang
          ? `سطوع الألوان: ${color_brightness}`
          : `Color Brightness: ${color_brightness}`}
      </li>
      <li dir='rtl'>
        {lang
          ? `نسبة التباين: ${contrast_ratio}`
          : `Contrast Ratio: ${contrast_ratio}`}
      </li>
      <li dir='rtl'>
        {lang
          ? `عمر مصدر الضوء في وضع الاقتصاد: ${light_source_life_economy_mode}`
          : `Light Source Life Economy Mode: ${light_source_life_economy_mode}`}
      </li>
      <li dir='rtl'>
        {lang
          ? `عمر مصدر الضوء في وضع العادي: ${light_source_life_normal_mode}`
          : `Light Source Life Normal Mode: ${light_source_life_normal_mode}`}
      </li>
      <li dir='rtl'>
        {lang ? `نسبة العرض: ${aspect_ratio}` : `Aspect Ratio: ${aspect_ratio}`}
      </li>
    </ul>
  )

  const gallerySection = (
    <article className='gallary'>
      <div className='viewed'>
        {gallery.map((img, index) => (
          <img
            key={img.id}
            className={sel === index ? `yes notYou` : `notYou`}
            src={resolveImage(img.image_path)}
            alt=''
          />
        ))}
      </div>
      <div className='other'>
        {gallery.map((img, index) => (
          <img
            onMouseEnter={() => setSelected(index)}
            onTouchStart={() => setSelected(index)}
            key={img.id}
            className={sel === index ? 'thumbActive' : undefined}
            src={resolveImage(img.image_path)}
            alt=''
          />
        ))}
      </div>
    </article>
  )

  const addToCart = (
    <div className='addToCart'>
      <div className='addMore'>
        <button onClick={() => setNum((n) => Math.max(1, n - 1))}>-</button>
        {num}
        <button onClick={() => setNum((n) => n + 1)}>+</button>
      </div>
      <button
        className='seePro'
        onClick={() => add(product.id, num)}
      >
        {lang ? 'أضف إلى السلة' : 'ADD TO CART'}
      </button>
    </div>
  )

  return (
    <>
      <main className='productPage'>
        <button
          style={{
            fontSize: lang ? '18px' : '',
          }}
          onClick={() => navigate(-1)}
          className='goBack'
        >
          {lang ? `العودة` : `GoBack`}{' '}
        </button>

        <section className='productDetail'>
          {width > 520 ? (
            <>
              {gallerySection}
              <article className='details'>
                <h1>{name}</h1>
                <span className='spanPrice'>{price} EGB</span>
                <p style={{ textAlign: lang ? 'right' : 'left' }}>{detail}</p>
                {addToCart}
                <h3
                  dir={lang ? 'rtl' : 'lrt'}
                  style={{
                    textAlign: lang ? 'right' : 'left',
                    alignSelf: lang ? 'flex-end' : 'flex-start',
                  }}
                >
                  {lang ? 'تفاصيل المنتج:' : 'Product Details:'}
                </h3>
                {specs}
              </article>
            </>
          ) : (
            <article className='phoneStyle'>
              <h1>{name}</h1>
              {gallerySection}
              <span className='spanPrice'>{price} EGB</span>
              <p style={{ textAlign: lang ? 'right' : 'left' }}>{detail}</p>
              {addToCart}
              <h3
                dir={lang ? 'rtl' : 'lrt'}
                style={{
                  textAlign: lang ? 'right' : 'left',
                  alignSelf: lang ? 'flex-end' : 'flex-start',
                }}
              >
                {lang ? 'تفاصيل المنتج:' : 'Product Details:'}
              </h3>
              {specs}
            </article>
          )}
        </section>

        {similar.length > 0 && (
          <section className='mayAlos'>
            <h2>{lang ? 'منتجات مماثلة' : 'Similar Products'}</h2>
            <div className='productGrid'>
              {similar.map((prod) => (
                <ProductCat
                  key={prod.id}
                  id={prod.id}
                  product={prod.product}
                  detail={prod.detail}
                  price={prod.price}
                  mainImage={prod.main_image}
                ></ProductCat>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer></Footer>
    </>
  )
}

export default ProductPage
