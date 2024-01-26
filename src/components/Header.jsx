import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo, ArrowRightIcon } from '../assets'

function Header () {
  // Data
  const { t } = useTranslation()
  const [clicked, setClicked] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Function
  const handleBurgerClick = () => { setClicked(!clicked) }

  // Hook
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header id='hero_header' className={`${scrolled ? 'bg-white' : 'bg-transparent'}`}>
      <div />
      <div>
        <div>
          <Link className='logo' to='/'><Logo /></Link>
          <div>
            <div className='nav-mobile'>
              <button className='btnBurger' onClick={handleBurgerClick}>
                <span className={clicked ? 'clicked' : ''} />
                <span className={clicked ? 'clicked' : ''} />
                <span className={clicked ? 'clicked' : ''} />
              </button>
              <div className={clicked ? '' : 'clicked'}>
                <div>
                  <section>
                    <span><Link to='/login'>{t('home.LOGIN')}</Link></span>
                  </section>
                </div>
                <div>
                  <Link to='/signup'>
                    {t('home.SIGNUP')}
                    <span><ArrowRightIcon /></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className='nav-desktop'>
              <div>
                <div>
                  <section>
                    <span><Link to='/login'>{t('home.LOGIN')}</Link></span>
                  </section>
                </div>
              </div>
            </div>
            <div className='nav-action'>
              <Link to='/signup'>
                {t('home.SIGNUP')}
                <span><ArrowRightIcon /></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
