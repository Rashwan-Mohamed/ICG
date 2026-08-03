import React from 'react'
import { useGlobalContext } from '../context'

function Bringing() {
  const { lang } = useGlobalContext()

  return (
    <section className='bringing'>
      <article>
        <h1>
          {lang ? 'PRJ-X مشغلات السينما المنزلية ' : 'PRJ-X Home Cinema Projectors'}
        </h1>
        <p>
          {lang
            ? 'استمتع بعروض الأفلام في المنزل'
            : 'Enjoy Movie Premieres at Home'}
        </p>
      </article>
      <picture>
        {' '}
        <source srcSet='\assets\icg\vision.webp' media='(min-width:1024px)' />
        <source
          srcSet='/assets/icg/cinema-kv-new2-1.jpg'
          media='(min-width:521px)'
        />
        <source
          srcSet='/assets/icg/cinema-kv-new2-1.jpg'
          media='(max-width:520px)'
        />
        <img
          src='/assets/icg/vision.webp'
          alt={lang ? 'صورة-أفضل-تجهيز' : 'image-best-gear'}
        />
      </picture>
    </section>
  )
}

export default Bringing
