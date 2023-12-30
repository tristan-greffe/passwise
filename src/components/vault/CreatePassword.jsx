import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { setLoader, setModal } from '../../store/componentSlice'
import { api } from '../../api'
import Form from '../form'

const createPassword = forwardRef((props, ref) => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const { user } = useSelector(state => state.user)
  const [values, setValues] = useState({})
  const latestValuesRef = useRef(values)
  const fields = [
    {
      id: 'name',
      label: 'createPassword.NAME_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'folder',
      label: 'createPassword.FOLDER_FIELD_LABEL',
      component: 'SelectField',
      options: categories
    },
    {
      id: 'login',
      label: 'createPassword.LOGIN_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'password',
      label: 'createPassword.PASSWORD_FIELD_LABEL',
      component: 'PasswordField'
    },
    {
      id: 'url',
      label: 'createPassword.URL_FIELD_LABEL',
      component: 'TextField'
    },
    {
      id: 'note',
      label: 'createPassword.NOTE_FIELD_LABEL',
      component: 'TextareaField'
    },
  ]

  // Hooks
  useEffect(() => {
    latestValuesRef.current = values
  }, [values])
  useEffect(() => {
    async function featchCategories () {
      const data = await api.service('api/categories').find({ paginate: false, query: { userId: user._id }})
      const transformedData =  data.data.map(category => {
        return { value: category._id, name: category.name }
      })
      transformedData.unshift({ value: '', name: t('createPassword.NO_FOLDER') })
      setCategories(transformedData)
    }
    featchCategories()
  }, [])
  // Functions
  function onFieldChanged (field, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  function hasError () {
    // Check name
    if (!_.has(latestValuesRef.current, 'name') && latestValuesRef.current.name.length < 1) {
      toast.error(t('createPassword.MISSING_NAME'))
      return true
    }
    if (!_.has(latestValuesRef.current, 'password') && latestValuesRef.current.password.length < 1) {
      toast.error(t('createPassword.MISSING_PASSWORD'))
      return true
    }
    return false
  }
  const closeModal = () => { dispatch(setModal({ open: false, modalConstructionKey: '' })) }
  async function apply () {
    if (hasError()) return
    try {
      dispatch(setLoader({ open: true }))
      const payload = {
        userId: user._id,
        name: latestValuesRef.current.name, 
        password: latestValuesRef.current.password,
      }
      if (_.has(latestValuesRef.current, 'folder') && latestValuesRef.current.folder.length > 1) payload.categoryId = latestValuesRef.current.folder
      if (_.has(latestValuesRef.current, 'login') && latestValuesRef.current.login.length > 1) payload.login = latestValuesRef.current.login
      if (_.has(latestValuesRef.current, 'url') && latestValuesRef.current.url.length > 1) payload.url = latestValuesRef.current.url
      if (_.has(latestValuesRef.current, 'note') && latestValuesRef.current.note.length > 1) payload.note = latestValuesRef.current.note
      await api.service('api/passwords').create(payload)
      dispatch(setLoader({ open: false }))
      closeModal()
      toast.success(t('createPassword.PASSWORD_ADDED'))
    } catch (error) {
      dispatch(setLoader({ open: false }))
      toast.error(t('createPassword.PASSWORD_ERROR_MESSAGE'))
    }
  }

  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))
  
  return (
    <Form fields={fields} onSubmit={apply} onFieldChanged={onFieldChanged} />
  )
})

export default createPassword