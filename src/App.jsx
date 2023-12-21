import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Toast, Loader } from './components'
import { setUser } from './store/userSlice'
import { api, initializeApi } from './api'
import config from './config.js'
import { Home, Login, Signup, ForgotPassword, ResetPassword } from './pages'

function App () {
  const dispatch = useDispatch()
  const { loader } = useSelector(state => state.component)
  
  initializeApi(config)

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const response = await api.reAuthenticate()
        const user = response.user ? response.user : {}
        dispatch(setUser(user))
      } catch (error) {
        await api.logout()
        await api.authentication.removeAccessToken()
        dispatch(setUser({}))
      }
    }
    handleAuthentication()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Toast />
      {loader.open && <Loader />}
    </BrowserRouter>
  )
}

export default App
