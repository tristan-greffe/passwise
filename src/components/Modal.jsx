import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { SquareIcon, CloseIcon } from '../assets'
import { setModal } from '../store/componentSlice'
import { settings } from './'

const Modal = () => {
  // Data
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const componentRef = useRef()
  const { modalConstructionKey } = useSelector((state) => state.component.modal)
  const [modalContent, setModalContent] = useState({ labelTitle: '', labelApplyButton: '', component: null } )

  // Hook
  useEffect(() => {
    switch (modalConstructionKey) {
      case 'profil-manager':
        setModalContent({
          labelTitle: 'profilManager.TITLE',
          labelApplyButton: 'APPLY',
          component: <settings.ProfilManager ref={componentRef} />
        })
        break 
      case 'email-manager':
        setModalContent({
          labelTitle: 'emailManager.TITLE',
          labelApplyButton: 'APPLY',
          component: <settings.EmailManager ref={componentRef} />
        })
        break
      case 'password-manager':
        setModalContent({
          labelTitle: 'passwordManager.TITLE',
          labelApplyButton: 'APPLY',
          component: <settings.PasswordManager ref={componentRef} />
        })
        break
      case 'delete-account-manager':
        setModalContent({
          labelTitle: 'deleteAccountManager.TITLE',
          labelApplyButton: 'APPLY',
          component: <settings.DeleteAccountManager ref={componentRef} />
        })
        break
      default:
        break 
    }
  }, [modalConstructionKey])

  // Functions
  const closeModal = () => { dispatch(setModal({ open: false, modalConstructionKey: '' })) }
  const applySettings = () => { 
    // Invoke apply function from component
    componentRef.current.apply() 
    closeModal()
  }

  return (
    <div id="modal">
      <div>
        <CloseIcon onClick={closeModal} />
        <div className="modal_wrap">
          <div className="modal_head">
            <SquareIcon />
            { t(modalContent.labelTitle) }
          </div>
          <div className="modal_body">
            {modalContent.component}
          </div>
          <div className="modal_foot">
            <button onClick={applySettings}>{ t(modalContent.labelApplyButton) }</button>
            <button onClick={closeModal}>
              { t('CANCEL') }
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal