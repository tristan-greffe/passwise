import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader } from '../../store/componentSlice'
import { Meta, LayoutSession } from '../../components'

function ForgotPassword () {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'email',
      label: 'forgotPassword.EMAIL_FIELD_LABEL',
      component: 'TextField'
    }
  ]
  const data = {
    id: 'forgot-password-session',
    title: 'forgotPassword.TITLE',
    message: 'forgotPassword.MESSAGE',
    buttonLabel: 'APPLY'
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
    // Check has email
    if (!_.has(latestValuesRef.current, 'email' || latestValuesRef.current.email.length < 1)) {
      toast.error(t('forgotPassword.MISSING_EMAIL'))
      return true
    }
    // Check email validity
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(latestValuesRef.current.email)) {
      toast.error(t('forgotPassword.EMAIL_VALIDITY'))
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
      //await sendResetPassword(latestValuesRef.current.email)
      setValues({})
      dispatch(setLoader({ open: false }))
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('forgotPassword.ERROR_MESSAGE_DEFAULT'))
    }
  }

  return (
    <>
      <Meta title="forgotPassword.META_TITLE" description="forgotPassword.META_DESCRIPTION" />
      <LayoutSession data={data} fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} />
    </>
  )
}

export default ForgotPassword