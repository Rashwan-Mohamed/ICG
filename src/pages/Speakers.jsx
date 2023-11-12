import React, { useEffect } from 'react'
// import { SPEAKERS } from '../data/CategoryData'
import ProductCat from '../components/ProductCat'
import Category from '../components/Category'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
import { useGlobalContext } from '../context'

function Speakers() {
  useEffect(() => {
    scrollTo(0, 0)
  }, [])
  const { lang } = useGlobalContext()

  return (
    <>
      <header className='headHeader'>
        <h1>{lang ? 'عنا' : 'About Us'}</h1>
      </header>
      <main className='aboutUs'>
        <p className='who'>
          {lang
            ? 'مرحبًا بك في ICG! نحن وجهتك الأمثل لشراء البروجيكتور في مصر. مع مجموعة واسعة من الطرازات والعلامات التجارية، بما في ذلك البروجيكتورات الجديدة والمستعملة المستوردة، لدينا شيء للجميع. ليست خبرتنا مقتصرة على المبيعات فقط - نحن هنا أيضًا لإصلاح أي نوع من أنواع البروجيكتور الذي تمتلكه. بفضل وصولنا إلى ملحقات متنوعة، نحن وجهتك الوحيدة لكل ما يتعلق بالبروجيكتور. في ICG، نحن نفتخر بتقديم خدمة ممتازة ومنتجات عالية الجودة لعملائنا. بفضل سنوات من الخبرة في الصناعة، يمكنك الاعتماد علينا لتلبية جميع احتياجاتك من البروجيكتور. سواء كنت تبحث عن شراء طراز جديد، أو تحتاج إلى إصلاح، أو ترغب في استكشاف مجموعتنا من الإكسسوارات، نحن هنا للمساعدة. شكرًا لاختيارك ICG كشريك موثوق لكل ما يتعلق بالبروجيكتور. نتطلع إلى خدمتك!'
            : "Welcome to ICG! We are your go-to destination for projectors in Egypt. With a wide range of models and brands, including both new and imported used projectors, we have something for everyone. Our expertise doesn't stop at sales – we're also here to fix any brand of projector you own. With access to a plethora of accessories, we're your one-stop shop for all things projector-related. At ICG, we take pride in providing top-notch service and quality products to our customers. With years of experience in the industry, you can trust us to meet all your projector needs. Whether you're looking to purchase a new model, need a repair, or want to explore our range of accessories, we're here to help. Thank you for choosing ICG as your trusted partner for all things projector-related. We look forward to serving you!"}
        </p>

        <section>
          <h4>{lang ? 'معلومات الاتصال:' : 'Contact info:'}</h4>
          <div>
            <a href='tel:+201012090137'>01012090137</a>
            <a href='tel:+201028329328'>01028329328</a>
            <a href='tel:+201010503578'>01010503578</a>
            <a>
              {lang
                ? 'راسلنا على WhatsApp: 01028329328'
                : 'Message Us on WhatsApp: 01028329328'}
            </a>
          </div>
          <h4>{lang ? 'موقعنا:' : 'Our Location:'}</h4>
          <ul>
            <li>
              4th Floor, Al-Bustan Mall
              <br />
              Downtown, Cairo
            </li>
            <br />
            <li>
              {' '}
              Mustafa Abu Haif Street
              <br />
              Abdeen, Cairo
            </li>
          </ul>
        </section>
        {/* {SPEAKERS.map((prod, index) => {
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
        {/* <Category></Category> */}
        {/* <Bringing></Bringing> */}
      </main>
      <Footer></Footer>
    </>
  )
}

export default Speakers
