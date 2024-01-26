import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { resetPassword } from '../../utils/utils.account'
import { setLoader } from '../../store/componentSlice'
import { Meta, LayoutSession } from '../../components'

function ResetPassword () {
  // Data
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'email',
      label: 'resetPassword.EMAIL_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'password',
      label: 'resetPassword.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'passwordConfirmation',
      label: 'resetPassword.CONFIRM_PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'token',
      label: 'resetPassword.TOKEN_FIELD_LABEL',
      component: 'TokenField'
    }
  ]
  const data = {
    id: 'forgot-password-session',
    title: 'resetPassword.TITLE',
    message: 'resetPassword.MESSAGE',
    buttonLabel: 'APPLY',
    action: {
      label: 'resetPassword.RESEND_TOKEN',
      to: '/forgot-password'
    }
  }

  // Hook
  useEffect(() => {
    latestValuesRef.current = values
  }, [values])

  // Functions
  function onFieldChanged (field, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }))
  }
  function hasError () {
    // Check has email
    if (!_.has(latestValuesRef.current, 'email' || latestValuesRef.current.email.length < 1)) {
      toast.error(t('resetPassword.MISSING_EMAIL'))
      return true
    }
    // Check has password
    if (!_.has(latestValuesRef.current, 'password') || latestValuesRef.current.password.length < 1) {
      toast.error(t('resetPassword.MISSING_PASSWORD'))
      return true
    }
    // Check has password confirmation
    if (!_.has(latestValuesRef.current, 'passwordConfirmation') || latestValuesRef.current.passwordConfirmation.length < 1) {
      toast.error(t('resetPassword.MISSING_PASSWORD_CONFIRMATION'))
      return true
    }
    // Check password match
    if (latestValuesRef.current.password !== latestValuesRef.current.passwordConfirmation) {
      toast.error(t('resetPassword.PASSWORD_CONFIRMATION_NOT_MATCH'))
      return true
    }
    // Check has token
    if (!_.has(latestValuesRef.current, 'token')) {
      toast.error(t('resetPassword.MISSING_TOKEN'))
      return true
    }
    // Check token length
    if (latestValuesRef.current.token.length < 6) {
      toast.error(t('resetPassword.ERROR_TOKEN_LENGTH'))
      return true
    }
    // Check email validity
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(latestValuesRef.current.email)) {
      toast.error(t('resetPassword.EMAIL_VALIDITY'))
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
      await resetPassword(latestValuesRef.current.email, latestValuesRef.current.token, latestValuesRef.current.password)
      setValues({})
      dispatch(setLoader({ open: false }))
      toast.success(t('resetPassword.SUCCESS_MESSAGE'))
      navigate('/login')
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('resetPassword.ERROR_MESSAGE'))
    }
  }

  return (
    <>
      <Meta title='resetPassword.META_TITLE' description='resetPassword.META_DESCRIPTION' />
      <LayoutSession data={data} fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} />
    </>
  )
}

export default ResetPassword
