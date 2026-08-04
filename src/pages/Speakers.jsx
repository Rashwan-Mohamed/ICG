import { useEffect } from 'react'
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
        <h1 dir={lang ? 'rtl' : 'ltr'}>{lang ? 'من نحن ؟' : 'About Us'}</h1>
      </header>
      <main className='aboutUs'>
        <p dir={lang ? 'rtl' : 'ltr'} className='who'>
          {lang
            ? 'مرحبًا بك في PRJ-X! نحن وجهتك الأمثل لشراء البروجيكتور في مصر. مع مجموعة واسعة من الطرازات والعلامات التجارية، بما في ذلك البروجيكتورات الجديدة والمستعملة المستوردة، لدينا شيء للجميع. ليست خبرتنا مقتصرة على المبيعات فقط - نحن هنا أيضًا لإصلاح أي نوع من أنواع البروجيكتور الذي تمتلكه. بفضل وصولنا إلى ملحقات متنوعة، نحن وجهتك الوحيدة لكل ما يتعلق بالبروجيكتور. في PRJ-X، نحن نفتخر بتقديم خدمة ممتازة ومنتجات عالية الجودة لعملائنا. بفضل سنوات من الخبرة في الصناعة، يمكنك الاعتماد علينا لتلبية جميع احتياجاتك من البروجيكتور. سواء كنت تبحث عن شراء طراز جديد، أو تحتاج إلى إصلاح، أو ترغب في استكشاف مجموعتنا من الإكسسوارات، نحن هنا للمساعدة. شكرًا لاختيارك PRJ-X كشريك موثوق لكل ما يتعلق بالبروجيكتور. نتطلع إلى خدمتك!'
            : "Welcome to PRJ-X! We are your go-to destination for projectors in Egypt. With a wide range of models and brands, including both new and imported used projectors, we have something for everyone. Our expertise doesn't stop at sales – we're also here to fix any brand of projector you own. With access to a plethora of accessories, we're your one-stop shop for all things projector-related. At PRJ-X, we take pride in providing top-notch service and quality products to our customers. With years of experience in the industry, you can trust us to meet all your projector needs. Whether you're looking to purchase a new model, need a repair, or want to explore our range of accessories, we're here to help. Thank you for choosing PRJ-X as your trusted partner for all things projector-related. We look forward to serving you!"}
        </p>

        <section>
          <h4 dir={lang ? 'rtl' : 'ltr'}>
            {lang ? 'معلومات الاتصال:' : 'Contact info:'}
          </h4>
          <div style={{ justifyContent: lang ? 'flex-end' : 'flex-start' }}>
            <a href='tel:+201028431234'>01028431234</a>
            <a dir={lang ? 'rtl' : 'ltr'}>
              {lang
                ? 'راسلنا على WhatsApp: 01028431234'
                : 'Message Us on WhatsApp: 01028431234'}
            </a>
          </div>
          <h4 dir={lang ? 'rtl' : 'ltr'}>
            {lang ? 'موقعنا:' : 'Our Location:'}
          </h4>
          <ul dir={lang ? 'rtl' : 'ltr'}>
            <li>
                {lang ? 'حلوان القاهرة' : 'Helwan Cairo'}
            </li>
          </ul>
        </section>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Speakers
