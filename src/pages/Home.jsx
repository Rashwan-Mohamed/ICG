import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from '../components/Category'
import SeeProduct from '../components/SeeProduct'
import Bringing from '../components/Bringing'
import Footer from '../components/Footer'
function Home() {
  useEffect(() => {
    scrollTo(0, 0)
  }, [])
  const naviage = useNavigate()
  return (
    <>
      <header className='homeHeader'>
        <div className='wrapper'>
          <article className='heleft'>
            <p className='newProduct'>Home Cinema Projector</p>
            <h1> The Feature of Data show</h1>
            <p>
              Experience innovative cinematic visuals and immersive
              entertainment with new ICG home projectors. Busk in authentic
              colors and bright and dark details supported by CinematicColor and
              HDR-PRO technologies in your home cinema for the most genuine,
              eye-popping experiences.
            </p>
            <button
              onClick={() => naviage('/product_detail/xx99-mark-ii')}
              className='seePro'
            >
              SEE PRODUCTS
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
              srcSet='src/assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <source
              media='(min-width:521px)'
              srcSet='src/assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <source
              media='(max-width:520px)'
              srcSet='src/assets/icg/homepage-hero-banner-0911-03-1.webp'
            />
            <img
              src='src/assets/icg/homepage-hero-banner-0911-03-1.webp'
              alt='zx9-speaker'
            />
          </picture>
          <article>
            <h1>Business Projectors</h1>
            <p>
              Bring greater clarity and collaboration to your business with ICG
              projectors, designed to fit your budget while supporting today’s
              workplace needs, including wireless mobility and a low cost of
              ownership.
            </p>
            <SeeProduct
              custome={'custom'}
              where={'/product_detail/zx9'}
            ></SeeProduct>
          </article>
        </section>
        <section className='z7x MaxWrapper'>
          <h2>Education Projectors</h2>
          <p>
            From small classrooms to large auditoriums, ICG line of multimedia
            projectors, displays are designed to be reliable and offer a low
            total cost of ownership that makes them ideal education investments.
          </p>
          <SeeProduct where={'/product_detail/zx9'}></SeeProduct>
        </section>
        <Bringing></Bringing>
        <section className='yx1 '>
          <section className='z7x'>
            <h2>Large Venue Projectors</h2>
            <p>
              For lecture halls, auditoriums, sanctuaries, events, and digital
              signage, these high-lumen projectors provide uncompromising image
              quality, brilliant video and professional-grade reliability.
            </p>
            <SeeProduct where={'/product_detail/yx1'}></SeeProduct>
            <picture>
              <source
                srcSet='\src\assets\icg\large-venue-projectors_bg_largevenueprinters.jpg'
                media='(min-width:1024px)'
              />
              <source
                srcSet='\src\assets\icg\large-venue-projectors_bg_largevenueprinters.jpg'
                media='(min-width:521px)'
              />
              <source
                srcSet='\src\assets\icg\large-venue-projectors_bg_largevenueprinters.jpg'
                media='(max-width:520px)'
              />
              <img
                src='\src\assets\icg\large-venue-projectors_bg_largevenueprinters.jpg'
                alt='speaker-zx7'
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
