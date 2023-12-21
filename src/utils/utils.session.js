import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice.js'
import { getLocale } from './utils.locale'
import { api } from '../api.js'
import _ from 'lodash'

const { t } = useTranslation()
const dispatch = useDispatch()

export async function login (email, password) {
  const payload = {
    strategy: 'local',
    email: email,
    password: password
  }
  const response = await api.authenticate(payload)
  api.authentication.setAccessToken(response.accessToken)
  dispatch(setUser(response.user))
}

export async function register (user) {
  delete user.passwordConfirmation
  delete user.acceptLicense
  user.locale = getLocale()

  try {
    await api.service('api/users').create(user)
  } catch (error) {
    toast.error(error.data.translationKey ? t('Register.' + error.data.translationKey) : t('Register.REGISTER_ERROR'))
  }
  await login(user.email, user.password)
}

export async function logout () {
  await api.logout()
  await api.authentication.removeAccessToken()
  dispatch(setUser({}))
}

export async function restoreSession () {
  try {
    const response = await api.reAuthenticate()
    const user = response.user ? response.user : {}
    dispatch(setUser(user))
  } catch (error) {
    await logout()
  }
}