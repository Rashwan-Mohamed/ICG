/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Cart from './Cart'
import { useWidth } from '../useWidt'
import Category from './Category'
function Navbar() {
  const { cart } = useGlobalContext()
  const [isHome, setIsHome] = useState(useLocation())
  const [scrolled, setScrolled] = useState(false)
  const [cartShow, setCartShow] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const bad = useRef(0)
  const sad = useRef(0)
  const hap = useRef(0)
  const nab = useRef(0)

  const width = useWidth()
  useEffect(() => {
    setIsHome(() => location.pathname)
  }, [location])

  useEffect(() => {
    if (cartShow || open) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [cartShow, open])
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setScrolled(() => true)
      } else {
        setScrolled(() => false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (open) {
        if (
          !hap.current.contains(e.target) &&
          !sad.current.contains(e.target) &&
          !nab.current.contains(e.target)
        )
          setOpen(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
  return (
    <nav
      ref={nab}
      style={{
        backgroundColor: isHome === '/' ? 'rgb(25, 25, 25)' : 'rgb(0, 0, 0)',
      }}
    >
      {open && (
        <>
          <div ref={hap} className='phonoProno'>
            <Category setOpen={setOpen}></Category>
          </div>
        </>
      )}
      <div className={scrolled ? 'navWrapper navScrolled' : 'navWrapper'}>
        {width < 768 && (
          <>
            <div
              ref={sad}
              onClick={() => setOpen(!open)}
              className={open ? 'menu-button buttonOpen' : 'menu-button'}
            >
              <div className='menu-button__burger'></div>
            </div>
          </>
        )}
        {/* <picture onClick={() => navigate('/')}>
          <source
            srcSet='src\assets\icg\icg.png'
            sizes='(min-width:1024px)'
          />
          <source
            srcSet='\assets\shared\tablet\logo.svg '
            sizes='(min-width:481px)'
          />
          <source
            srcSet='\assets\shared\mobile\logo.svg'
            media='(max-width:480px)'
          />
          <img srcSet='\assets\shared\desktop\logo.svg' alt='audiophile logo' />
        </picture> */}
        <h2 className='LEGO' >ICG</h2>
        <ul className='cats'>
          <li className={isHome === '/' ? 'here' : 'undefined'}>
            <Link to={'/'}>Home</Link>
          </li>
          <li className={isHome === '/headphones' ? 'here' : 'undefined'}>
            <Link to={'/headphones'}>Products</Link>
          </li>
          <li className={isHome === '/speakers' ? 'here' : 'undefined'}>
            <Link to={'/speakers'}>About Us</Link>
          </li>
          {/* <li className={isHome === '/earphones' ? 'here' : 'undefined'}>
            <Link to={'/earphones'}>Earphones</Link>
          </li> */}
        </ul>
        {/* <div ref={bad} onClick={() => setCartShow(!cartShow)} className='press'>
          {cart.length > 0 && <span>{cart.length}</span>}
          <img src='\assets\shared\desktop\icon-cart.svg' alt='icon-cart' />
        </div> */}
      </div>
      {cartShow && <Cart bad={bad} setCartShow={setCartShow}></Cart>}
    </nav>
  )
}

export default Navbar
