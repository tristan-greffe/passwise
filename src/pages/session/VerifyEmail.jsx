import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { verifySignup } from '../../utils/utils.account'
import { setLoader } from '../../store/componentSlice'
import { setUser } from '../../store/userSlice'
import { Meta, LayoutSession } from '../../components'

function VerifyEmail () {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'token',
      component: 'TokenField'
    }
  ]
  const data = {
    id: 'verify-email-session',
    title: 'verifyEmail.TITLE',
    buttonLabel: 'APPLY',
    message: 'verifyEmail.MESSAGE'
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
    // Check has token
    if (!_.has(latestValuesRef.current, 'token')) {
      toast.error(t('verifyEmail.MISSING_TOKEN'))
      return true
    }
    // Check token length
    if (latestValuesRef.current.token.length < 6) {
      toast.error(t('verifyEmail.ERROR_TOKEN_LENGTH'))
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
      await verifySignup(latestValuesRef.current.token, user.email)
      dispatch(setUser({ ...user, isVerified: true}))
      setValues({})
      dispatch(setLoader({ open: false }))
      toast.success(t('verifyEmail.EMAIL_VERIFIED'))
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(t('verifyEmail.ERROR_MESSAGE'))
      dispatch(setLoader({ open: false }))
    }
  }

  return (
    <>
      <Meta title="verifyEmail.META_TITLE" description="verifyEmail.META_DESCRIPTION" />
      <LayoutSession data={data} fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} />
    </>
  )
}

export default VerifyEmail