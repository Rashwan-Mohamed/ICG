import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from '../components/Category'
import SeeProduct from '../components/SeeProduct'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
import { useGlobalContext } from '../context'

function Home() {
  useEffect(() => {
    scrollTo(0, 0)
  }, [])
  const naviage = useNavigate()
  const { lang } = useGlobalContext()

  // Assuming you have a variable `isArabic` that indicates the language

  // Get the body element

  // Set the font family based on the language
  // ;;(body.style.fontFamily = lang ? 'Rubik, sans-serif' : 'MANROPE'), 'arial'

  return (
    <>
      <header className='homeHeader'>
        <div className='wrapper'>
          <article
            style={{
              textAlign: lang ? 'right' : 'left',
              alignItems: lang ? 'flex-end' : 'flex-start',
            }}
            className='heleft'
          >
            <p className='newProduct'>
              {lang ? 'Home Cinema Projector' : 'Home Cinema Projector'}
            </p>
            <h1>
              {lang
                ? 'مستقبل العرض البياني في الشرق الاوسط'
                : 'The future of Data show'}
            </h1>
            <p dir='rtl'>
              {lang
                ? 'تجربة رؤية مبتكرة للصور السينمائية وترفيه مغمور مع مشغلات السينما المنزلية الجديدة من PRJ-X. استمتع بتجارب حقيقية مع ألوان أصيلة وتفاصيل ساطعة ومظلمة مدعومة بتقنيات CinematicColor و HDR-PRO في سينما منزلك، لتحظى بتجارب حقيقية ومذهلة للعيون.'
                : 'Experience innovative cinematic visuals and immersive entertainment with new PRJ-X home projectors. Bask in authentic colors and bright and dark details supported by CinematicColor and HDR-PRO technologies in your home cinema for the most genuine, eye-popping experiences.'}
            </p>
            <button onClick={() => naviage('/projectors')} className='seePro'>
              {lang ? 'رؤية المنتجات' : 'SEE PRODUCTS'}
            </button>
          </article>
        </div>
      </header>
      <main>
        {/* <Category></Category> */}
        <section className='stein '>
          <picture>
            <source
              media='(min-width:1024px)'
              srcSet='/assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <source
              media='(min-width:521px)'
              srcSet='assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <source
              media='(max-width:520px)'
              srcSet='assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <img
              src='assets/icg/homepage-hero-banner-0911-03-1.webp'
              alt={lang ? 'zx9-speaker' : 'صورة-أفضل-تجهيز'}
            />
          </picture>
          <article>
            <h1>{lang ? 'مشغلات الأعمال' : 'Business Projectors'}</h1>
            <p
              dir='rtl'
              style={{
                fontSize: lang ? '18px' : '15px',
              }}
            >
              {lang
                ? 'جلب الوضوح والتعاون الأكبر إلى عملك مع مشغلات PRJ-X ، مصممة لتناسب ميزانيتك مع دعم احتياجات مكان العمل الحديثة ، بما في ذلك التنقل اللاسلكي وتكلفة امتلاك منخفضة.'
                : 'Bring greater clarity and collaboration to your business with PRJ-X projectors, designed to fit your budget while supporting today’s workplace needs, including wireless mobility and a low cost of ownership.'}
            </p>
            <SeeProduct
              style={{
                fontSize: lang ? '18px' : '15px',
              }}
              custome={'custom'}
              where={'/projectors'}
            ></SeeProduct>
          </article>
        </section>
        <section
          style={{
            alignItems: lang ? 'flex-end' : 'flex-start',
            justifyContent: lang ? 'space-between' : 'center',
            textAlign: lang ? 'right' : 'left',
          }}
          className='z7x MaxWrapper'
        >
          <h2>{lang ? 'مشغلات التعليم' : 'Education Projectors'}</h2>
          <p
            dir='rtl'
            style={{
              fontSize: lang ? '18px' : 'initial',
            }}
          >
            {lang
              ? 'من الفصول الدراسية الصغيرة إلى القاعات الكبيرة ، تم تصميم مشغلات PRJ-X متعددة الوسائط والشاشات لتكون موثوقة وتقدم تكلفة ملكية إجمالية منخفضة تجعلها استثمارات تعليمية مثالية.'
              : 'From small classrooms to large auditoriums, PRJ-X line of multimedia projectors, displays are designed to be reliable and offer a low total cost of ownership that makes them ideal education investments.'}
          </p>
          <SeeProduct where={'/projectors'}></SeeProduct>
        </section>
        <Bringing></Bringing>
        <section className='yx1 '>
          <section className='z7x'>
            <h2>
              {lang ? 'مشغلات الفعاليات الكبيرة' : 'Large Venue Projectors'}
            </h2>
            <p dir='rtl' >
              {lang
                ? 'لقاعات المحاضرات ، القاعات الكبيرة ، المحرمات ، الفعاليات ، والعلامات الرقمية ، تقدم هذه المشغلات العالية اللومن صورًا ذات جودة لا تقبل المساومة ، وفيديو رائع وموثوقية عالية المستوى.'
                : 'For lecture halls, auditoriums, sanctuaries, events, and digital signage, these high-lumen projectors provide uncompromising image quality, brilliant video and professional-grade reliability.'}
            </p>
            <SeeProduct where={'/projectors'}></SeeProduct>
            <picture>
              <source
                srcSet='/assets/icg/large-venue-projectors_bg_largevenueprinters.jpg'
                media='(min-width:1024px)'
              />
              <source
                srcSet='/assets/icg/large-venue-projectors_bg_largevenueprinters.jpg'
                media='(min-width:521px)'
              />
              <source
                srcSet='/assets/icg/large-venue-projectors_bg_largevenueprinters.jpg'
                media='(max-width:520px)'
              />
              <img
                src='/assets/icg/large-venue-projectors_bg_largevenueprinters.jpg'
                alt={lang ? 'speaker-zx7' : 'صورة-سماعة-كبيرة-الفعاليات'}
              />
            </picture>
          </section>
        </section>
        {/* <Bringing></Bringing> */}
      </main>
      <Footer></Footer>
    </>
  )
}

export default Home
