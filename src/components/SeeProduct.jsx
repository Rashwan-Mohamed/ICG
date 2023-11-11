import React from 'react'
import { Link } from 'react-router-dom'
Link
function SeeProduct({ where, sases,custom }) {
  return (
    <Link className={sases ? 'seePro ' : 'sawPro'} to={where}>
      SEE PRODUCTS
    </Link>
  )
}

export default SeeProduct
