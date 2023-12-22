import { useState, useRef, useEffect } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader } from '../../store/componentSlice'
import { changePassword } from '../../utils/utils.account'
import Form from '../form'

const PasswordManager = forwardRef((props, ref) => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'oldPassword',
      label: 'passwordManager.OLD_PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'newPassword',
      label: 'passwordManager.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'passwordConfirmation',
      label: 'passwordManager.CONFIRM_PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
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
  function hasError () {
    // Check has old password
    if (!_.has(latestValuesRef.current, 'oldPassword')) {
      toast.error(t('passwordManager.MISSING_OLD_PASSWORD'))
      return true
    }
    // Check has password
    if (!_.has(latestValuesRef.current, 'newPassword')) {
      toast.error(t('passwordManager.MISSING_PASSWORD'))
      return true
    }
    // Check has password confirmation
    if (!_.has(latestValuesRef.current, 'passwordConfirmation')) {
      toast.error(t('passwordManager.MISSING_PASSWORD_CONFIRMATION'))
      return true
    }
    // Check password match
    if (latestValuesRef.current.newPassword !== latestValuesRef.current.passwordConfirmation) {
      toast.error(t('passwordManager.PASSWORD_CONFIRMATION_NOT_MATCH'))
      return true
    }
    return false
  }
  async function apply (e) {
 
    if (hasError()) return
    try {
      dispatch(setLoader({ open: true }))
      await changePassword(user.email, latestValuesRef.current.passwordConfirmation, latestValuesRef.current.newPassword)
      dispatch(setLoader({ open: false }))
      toast.success(t('passwordManager.PASSWORD_CHANGED'))
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(error.data.translationKey ? t('signup.'+ error.data.translationKey) : t('passwordManager.PASSWORD_ERROR_MESSAGE'))
    }
  }

  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))
  
  return (
    <>
      <Form fields={fields} onSubmit={apply} onFieldChanged={onFieldChanged} />
    </>
  )
})

export default PasswordManager