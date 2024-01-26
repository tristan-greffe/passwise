import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader, setModal } from '../../store/componentSlice'
import { api } from '../../api'
import Form from '../form'

const CreateCategory = forwardRef((props, ref) => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'name',
      label: 'createCategorie.NAME_FIELD_LABEL',
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
      [field]: value
    }))
  }
  function hasError () {
    // Check name
    if (!_.has(latestValuesRef.current, 'name') && latestValuesRef.current.name.length < 1) {
      toast.error(t('createCategorie.MISSING_NAME'))
      return true
    }
    return false
  }
  const closeModal = () => { dispatch(setModal({ open: false, modalConstructionKey: '' })) }
  async function apply () {
    if (hasError()) return
    try {
      dispatch(setLoader({ open: true }))
      await api.service('api/categories').create({ userId: user._id, name: latestValuesRef.current.name })
      dispatch(setLoader({ open: false }))
      closeModal()
      toast.success(t('createCategorie.CATEGORY_ADDED'))
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('createCategorie.CATEGORY_ERROR_MESSAGE'))
    }
  }

  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply }))

  return (
    <Form fields={fields} onSubmit={apply} onFieldChanged={onFieldChanged} />
  )
})

export default CreateCategory
