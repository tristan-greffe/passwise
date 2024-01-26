import { useLocation } from 'react-router-dom'
import { Navbar, Sidebar } from './'
import { LogoWhite } from '../../assets'

const Layout = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <>
      <div id='main-layout'>
        <Navbar />
        <div>
          <header>
            <div>
              <img src={LogoWhite} alt='logo' />
            </div>
          </header>
          <main>
            {pathname === '/vault' && <Sidebar />}
            {children}
          </main>
        </div>
      </div>
    </>

  )
}

export default Layout
