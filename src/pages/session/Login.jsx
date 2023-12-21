import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader } from '../../store/componentSlice'
import { setUser } from '../../store/userSlice'
import { Meta, LayoutSession } from '../../components'
import { api } from '../../api'

import { useSelector } from 'react-redux'

function Login () {
  const { user } = useSelector(state => state.user)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'email',
      label: 'login.EMAIL_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'password',
      label: 'login.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
  ]
  const data = {
    id: 'login-session',
    title: 'login.TITLE',
    buttonLabel: 'login.LOGIN_LABEL',
    action: {
      label: 'login.FORGOT_YOUR_PASSWORD_LABEL',
      to: '/forgot-password'
    }
  }

  useEffect(() => {
    latestValuesRef.current = values
  }, [values])

  // Functions
  function onFieldChanged (field, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }
  function hasError () {
    if (!_.has(latestValuesRef.current, 'email') || !_.has(latestValuesRef.current, 'password') || latestValuesRef.current.email.length < 1 || latestValuesRef.current.password.length < 1) {
      toast.error(t('login.MISSING_PROPERTY'))
      return true
    }
    return false
  }
  async function onSubmit (e) {
    e.preventDefault()
    if (hasError()) return
    try {
      dispatch(setLoader({ open: true }))
      await new Promise(resolve => setTimeout(resolve, 1000))
      const payload = {
        strategy: 'local',
        email: latestValuesRef.current.email,
        password: latestValuesRef.current.password
      }
      const response = await api.authenticate(payload)
      api.authentication.setAccessToken(response.accessToken)
      dispatch(setUser(response.user))
      setValues({})
      dispatch(setLoader({ open: false }))
      console.log(user)
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('login.LOGIN_ERROR'))
    }
  }

  return (
    <>
      <Meta title="login.META_TITLE" description="login.META_DESCRIPTION" />
      <LayoutSession data={data} fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} />
    </>
  )
}

export default Login