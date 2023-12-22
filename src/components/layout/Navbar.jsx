import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { api } from '../../api'
import config from '../../config'
import { setUser } from '../../store/userSlice'
import { Logo, MenuMobileIcon, CloseMobileIcon, TurnOffIcon, NavTopGreyWave, NavTopBlueWave, LogoutIcon } from '../../assets'


const NavLink = ({ title, to, Icon, spacer }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  return (
    <>
      <Link to={to} className={`${pathname === to ? 'active': ''}`} >
        <div>
          <div>
            <Icon />
          </div>
          <span>{ t(title) }</span>
        </div>
      </Link>
      {spacer && <div className="spacer"></div>}
    </>
  )
}

const Navbar = () => {
  const { t } = useTranslation()
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [menuState, setMenuState] = useState(false)
  const navLinks = config.navLinks
  
  const toggleMenu = () => { setMenuState(!menuState) }

  const logout = async () => {
    await api.logout()
    await api.authentication.removeAccessToken()
    dispatch(setUser({}))
  }
  return (
    <nav>
      <div className="nav_head">
        <NavTopGreyWave />
        <div>
          <NavTopBlueWave />
          <span className="uppercase">{ _.take(user.name, 2).join('') }</span>
          <div>
            <b>{ user.name }</b>
            <small>{ user.email }</small>
          </div>
        </div>
      </div>
      <div className="nav_body">
        {navLinks.map((navLink, index) => (
          <NavLink key={navLink.title} index={index} {...navLink} />
        ))}
        <Link onClick={logout} >
          <div>
            <div>
              <LogoutIcon />
            </div>
            <span>{ t('navbar.LOGOUT') }</span>
          </div>
        </Link>
      </div>
      <div className="nav_foot">
        <Logo />
      </div>
      <div className="mobile-nav">
        <div className="nav_head">
          <button onClick={toggleMenu}>
            { menuState ? <CloseMobileIcon /> : <MenuMobileIcon /> }
          </button>
          <Logo />
        </div>
        <div className={`nav-pop ${menuState ? 'show': ''}`}>
          <div className="nav-pop_head">
            <b>{ user.name }</b>
            <button onClick={logout}><TurnOffIcon /></button>
          </div>
          <div className="nav_body">
            {navLinks.map((navLink) => (
              <NavLink key={navLink.title} {...navLink} />
            ))}
            <Link onClick={logout} >
              <div>
                <div>
                  <LogoutIcon />
                </div>
                <span>{ t('navbar.LOGOUT') }</span>
              </div>
            </Link>
          </div>
          <div className="nav-pop_foot">
            <Logo />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
