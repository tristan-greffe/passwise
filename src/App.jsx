import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import logger from 'loglevel'
import toast from 'react-hot-toast'
import { Toast, Loader } from './components'
import { setUser } from './store/userSlice'
import { setLoader } from './store/componentSlice'
import { api, initializeApi } from './api'
import config from './config.js'
import { Home, Login, Signup, ForgotPassword, ResetPassword, VerifyEmail } from './pages'

function App () {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loader } = useSelector(state => state.component)
  let pendingReconnection = null
  initializeApi(config)

  // Functions
  function onReconnectError () {
    // Display it only the first time the error appears because multiple attempts will be tried
    if (!pendingReconnection) {
      logger.error(new Error('Socket has been disconnected'))
      // This will ensure any operation in progress will not keep a "dead" loading indicator
      // as this error might appear under-the-hood without notifying service operations
      pendingReconnection = true
      dispatch(setLoader({ open: true }))
      toast.error(t('session.ALERT'))
      toast.error(t('session.REFUSED'))
    }
  }
  function onReconnect () {
    // Dismiss pending reconnection error message
    if (pendingReconnection) {
      pendingReconnection = null
      dispatch(setLoader({ open: false }))
    }
    logger.error(new Error('Socket disconnected, not trying to reconnect automatically in development mode please refresh page manually'))
  }
  function onRateLimit () {
    toast.error(t('session.ALERT'))
    toast.error(t('session.REFUSED'))
  }
  async function handleAuthentication () {
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

  // Hooks
  useEffect(() => {
    // Handle socket connexion
    if (api.socket) {
      // Display error message if we cannot contact the server
      api.socket.io.on('reconnect_error', onReconnectError)
      // Handle reconnection correctly, otherwise auth seems to be lost
      // Also easier to perform a full refresh instead of handling this specifically on each activity
      api.socket.io.on('reconnect', onReconnect)
      // Display error message if we have been banned from the server
      api.socket.on('rate-limit', onRateLimit)
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
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toast />
      {loader.open && <Loader />}
    </BrowserRouter>
  )
}

export default App
