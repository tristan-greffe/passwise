import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { getLocale } from '../../utils/utils.locale'
import { setLoader } from '../../store/componentSlice'
import { setUser } from '../../store/userSlice'
import { Meta, LayoutSession } from '../../components'
import { api } from '../../api'

function Signup () {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'name',
      label: 'signup.NAME_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'email',
      label: 'signup.EMAIL_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'password',
      label: 'signup.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'passwordConfirmation',
      label: 'signup.CONFIRM_PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
  ]
  const data = {
    id: 'register-session',
    title: 'signup.TITLE',
    buttonLabel: 'signup.REGISTER_LABEL',
    action: {
      label: 'signup.ALREADY_HAVE_AN_ACCOUNT_LABEL',
      to: '/login'
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
    // Check has name
    if (!_.has(latestValuesRef.current, 'name') || latestValuesRef.current.name.length < 1) {
      toast.error(t('signup.MISSING_NAME'))
      return true
    }
    // Check has email
    if (!_.has(latestValuesRef.current, 'email' || latestValuesRef.current.email.length < 1)) {
      toast.error(t('signup.MISSING_EMAIL'))
      return true
    }
    // Check has password
    if (!_.has(latestValuesRef.current, 'password') || latestValuesRef.current.password.length < 1) {
      toast.error(t('signup.MISSING_PASSWORD'))
      return true
    }
    // Check has password confirmation
    if (!_.has(latestValuesRef.current, 'passwordConfirmation') || latestValuesRef.current.passwordConfirmation.length < 1) {
      toast.error(t('signup.MISSING_PASSWORD_CONFIRMATION'))
      return true
    }
    // Check password match
    if (latestValuesRef.current.password !== latestValuesRef.current.passwordConfirmation) {
      toast.error(t('signup.PASSWORD_CONFIRMATION_NOT_MATCH'))
      return true
    }
    // Check email validity
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(latestValuesRef.current.email)) {
      toast.error(t('signup.EMAIL_VALIDITY'))
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
      let payload = {
        name: latestValuesRef.current.name,
        email: latestValuesRef.current.email,
        password: latestValuesRef.current.password,
        locale: getLocale()
      }
      await api.service('api/users').create(payload)
      payload = {
        strategy: 'local',
        email: latestValuesRef.current.email,
        password: latestValuesRef.current.password
      }
      const response = await api.authenticate(payload)
      api.authentication.setAccessToken(response.accessToken)
      dispatch(setUser(response.user))
      setValues({})
      dispatch(setLoader({ open: false }))
      navigate('/verify-email')
    } catch (error) {
      toast.error(error.data.translationKey ? t('signup.' + error.data.translationKey) : t('signup.REGISTER_ERROR'))
      dispatch(setLoader({ open: false }))
    }
  }

  return (
    <>
      <Meta title="signup.META_TITLE" description="signup.META_DESCRIPTION" />
      <LayoutSession data={data} fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} />
    </>
  )
}

export default Signup