import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader, setModal } from '../../store/componentSlice'
import { sendChangeIdentity, verifySignup } from '../../utils/utils.account'
import Form from '../form'

const EmailManager = forwardRef((props, ref) => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const [step, setStep] = useState(1)
  const latestValuesRef = useRef(values)
  const modifyEmailFields = [
    {
      id: 'password',
      label: 'emailManager.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'email',
      label: 'emailManager.EMAIL_FIELD_LABEL',
      component: 'TextField'
    }
  ]
  const validateEmailFields = [
    {
      id: 'token',
      label: 'emailManager.TOKEN_LABEL',
      component: 'TokenField'
    }
  ]
  
  // Hooks
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
  function hasErrorModifyEmail () {
    // Check has password
    if (!_.has(latestValuesRef.current, 'password')) {
      toast.error(t('emailManager.MISSING_PASSWORD'))
      return true
    }
    // Check has email
    if (!_.has(latestValuesRef.current, 'email')) {
      toast.error(t('emailManager.MISSING_EMAIL'))
      return true
    }
    // Check email validity
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(latestValuesRef.current.email)) {
      toast.error(t('emailManager.EMAIL_VALIDITY'))
      return true
    }
    return false
  }
  function hasErrorValidateEmail () {
    // Check has token
    if (!_.has(latestValuesRef.current, 'token' || latestValuesRef.current.token.length !== 6)) return true
    return false
  }
  const closeModal = () => { dispatch(setModal({ open: false, modalConstructionKey: '' })) }
  async function apply () {
    switch (step) {
      case 1:
        if (hasErrorModifyEmail()) return
        try {
          dispatch(setLoader({ open: true }))
          await sendChangeIdentity(user.email, latestValuesRef.current.email, latestValuesRef.current.password)
          dispatch(setLoader({ open: false }))
          setValues({})
          setStep(2)
        } catch (error) {
          dispatch(setLoader({ open: false }))
          toast.error(error.data.translationKey ? t('signup.'+ error.data.translationKey) : t('emailManager.PASSWORD_ERROR_MESSAGE'))
        }
        break 
      case 2:
        if (hasErrorValidateEmail()) return
        try {
          dispatch(setLoader({ open: true }))
          await verifySignup(latestValuesRef.current.token, user.email)
          dispatch(setLoader({ open: false }))
          toast.success(t('emailManager.EMAIL_CHANGED'))
          closeModal()
        } catch (error) {
          dispatch(setLoader({ open: false }))
          toast.error(t('emailManager.ERROR_MESSAGE'))
        }
      default:
        break 
    }
  }

  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))

  return (
    <Form fields={step === 1 ? modifyEmailFields : validateEmailFields} onSubmit={apply} onFieldChanged={onFieldChanged} /> 
  )
})

export default EmailManager