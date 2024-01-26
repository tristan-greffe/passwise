import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import logger from 'loglevel'
import _ from 'lodash'
import { setUser } from './store/userSlice'
import { setLoader } from './store/componentSlice'
import { api, initializeApi } from './api'
import config from './config.js'
import { Toast, Loader, Modal } from './components'
import {
  Home, Login, Signup, ForgotPassword, ResetPassword, VerifyEmail,
  Dashboard, Vault, Settings
} from './pages'

function App () {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { modal, loader } = useSelector(state => state.component)
  const { user } = useSelector(state => state.user)
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
      const person = response.user ? response.user : {}
      dispatch(setUser(person))
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

  // Guards
  const PublicPageGuard = ({ user, from, children }) => {
    if (from === 'verify-email' && _.isEmpty(user)) return <Navigate to='/login' replace />
    if (!_.isEmpty(user) && user.isVerified === true) return <Navigate to='/dashboard' replace />
    if (from === 'home' || from === 'verify-email') return children
    if (!_.isEmpty(user) && user.isVerified === false) return <Navigate to='/verify-email' replace />
    return children
  }
  const PrivatePageGuard = ({ user, children }) => {
    if (_.isEmpty(user) || user.isVerified === false) return <Navigate to='/login' replace />
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/' element={<PublicPageGuard user={user} from='home'><Home /></PublicPageGuard>} />
        <Route path='/login' element={<PublicPageGuard user={user} from='login'><Login /></PublicPageGuard>} />
        <Route path='/signup' element={<PublicPageGuard user={user} from='signup'><Signup /></PublicPageGuard>} />
        <Route path='/forgot-password' element={<PublicPageGuard user={user} from='forgot-password'><ForgotPassword /></PublicPageGuard>} />
        <Route path='/reset-password' element={<PublicPageGuard user={user} from='reset-password'><ResetPassword /></PublicPageGuard>} />
        <Route path='/verify-email' element={<PublicPageGuard user={user} from='verify-email'><VerifyEmail /></PublicPageGuard>} />
        <Route path='/dashboard' element={<PrivatePageGuard user={user}><Dashboard /></PrivatePageGuard>} />
        <Route path='/vault' element={<PrivatePageGuard user={user}><Vault /></PrivatePageGuard>} />
        <Route path='/settings' element={<PrivatePageGuard user={user}><Settings /></PrivatePageGuard>} />
      </Routes>
      <Toast />
      {loader.open && <Loader />}
      {modal.open && <Modal />}
    </BrowserRouter>
  )
}

export default App
