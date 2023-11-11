import React from 'react'

function Bringing() {
  return (
    <section className='bringing'>
      <article>
        <h1> ICG Home Cinema Projectors</h1>
        <p>Enjoy Movie Premieres at Home</p>
      </article>
      <picture>
        {' '}
        <source
          srcSet='\assets\icg\vision.webp'
          media='(min-width:1024px)'
        />
        <source
          srcSet='/assets/icg/cinema-kv-new2-1.jpg'
          media='(min-width:521px)'
        />
        <source
          srcSet='/assets/icg/cinema-kv-new2-1.jpg'
          media='(max-width:520px)'
        />
        <img src='/assets/icg/vision.webp' alt='image-best-gear' />
      </picture>
    </section>
  )
}

export default Bringing
