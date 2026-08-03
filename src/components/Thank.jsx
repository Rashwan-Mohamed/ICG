import react from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { resolveImage } from '../services/api'

function Thank({ cartProducts, grand, setThank }) {
  const { removeAll } = useGlobalContext()

  const navigate = useNavigate()
  return (
    <section className='finalGoodBye cartOverlay'>
      <section className='sectionBye'>
        <div className='doneRight'>✓</div>
        <h1>your order summary is ready</h1>

        <p>
          We opened WhatsApp with your order details — send that message to
          confirm with us.
        </p>

        <div className='summerizeo'>
          <ul className='disPro'>
            {cartProducts.length >= 1 &&
              cartProducts.map((item) => {
                const { product, price, main_image, num, id } = item
                return (
                  <li key={id}>
                    <img src={resolveImage(main_image)} alt={product} />
                    <span> {product}</span>
                    <span> {price} EGB</span>
                    <span>x{num}</span>
                  </li>
                )
              })}
          </ul>
          <div className='grandTotal'>
            <span>grand total:</span> {grand} EGB
          </div>
        </div>
        <button
          onClick={() => {
            removeAll()
            setThank(false)
            document.body.style.overflowY = 'scroll'
            navigate('/')
          }}
          className='seePro'
        >
          BACK TO HOME
        </button>
      </section>
    </section>
  )
}

export default Thank
