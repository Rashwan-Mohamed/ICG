// import React from 'react'
import { Link } from 'react-router-dom'
function Category({ setOpen }) {
  return (
    <section className='mightKnow MaxWrapper'>
      <Link
        onClick={() => {
          if (setOpen) {
            setOpen(false)
          }
        }}
        to={'/headphones'}
      >
        <picture>
          <img
            src='/assets\icg\w2710-gallery-1-2.webp'
            alt='mark-one-headphones'
          />
        </picture>{' '}
        <h5>Projectors</h5>
        <div>
          shop{' '}
          <span>
            <img src='/assets/shared/desktop/icon-arrow-right.svg' alt='shop' />
          </span>
        </div>
      </Link>
      <Link
        onClick={() => {
          if (setOpen) {
            setOpen(false)
          }
        }}
        to={'/speakers'}
      >
        <picture>
          <img
            src='/assets/shared/desktop/image-speakers.png'
            alt='mark-one-headphones'
          />
        </picture>{' '}
        <h5>Laptops</h5>
        <div>
          shop{' '}
          <span>
            <img src='/assets/shared/desktop/icon-arrow-right.svg' alt='shop' />
          </span>
        </div>
      </Link>{' '}
      <Link
        onClick={() => {
          if (setOpen) {
            setOpen(false)
          }
        }}
        to={'/earphones'}
      >
        <picture>
          <img
            src='/assets/shared/desktop/image-earphones.png'
            alt='mark-one-headphones'
          />
        </picture>{' '}
        <h5>accessories</h5>
        <div>
          shop{' '}
          <span>
            <img src='/assets/shared/desktop/icon-arrow-right.svg' alt='shop' />
          </span>
        </div>
      </Link>
    </section>
  )
}

export default Category
