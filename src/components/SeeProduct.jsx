import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

function SeeProduct({ where, sases, custom }) {
  const { lang } = useGlobalContext()

  return (
    <Link className={sases ? 'seePro ' : 'sawPro'} to={where}>
      {lang ? 'رؤية المنتجات' : 'SEE PRODUCTS'}
    </Link>
  )
}

export default SeeProduct
