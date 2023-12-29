import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader, setModal } from '../../store/componentSlice'
import { setUser } from '../../store/userSlice'
import { api } from '../../api'
import Form from '../form'

const DeleteAccountManager = forwardRef((props, ref) => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'email',
      label: 'deleteAccountManager.CONFIRMATION',
      component: 'TextField'
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
    // Check has email
    if (!_.has(latestValuesRef.current, 'email') && latestValuesRef.current.email.length < 1) return true
    // Check email match
    if (latestValuesRef.current.email !== user.email) return true
    return false
  }
  const closeModal = () => { dispatch(setModal({ open: false, modalConstructionKey: '' })) }
  async function apply () {
    if (hasError()) return
    try {
      dispatch(setLoader({ open: true }))
      await api.service('api/users').remove(user._id)
      dispatch(setUser({}))
      dispatch(setLoader({ open: false }))
      closeModal()
      navigate('/')
      toast.success(t('deleteAccountManager.SUCCESS_MESSAGE'))
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('deleteAccountManager.ERROR_MESSAGE'))
    }
  }

  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))

  return (
    <Form fields={fields} onSubmit={apply} onFieldChanged={onFieldChanged} />
  )
})

export default DeleteAccountManager