import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { SquareIcon, CloseIcon } from '../assets'
import { setModal } from '../store/componentSlice'
import { settings } from './'

const Modal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const componentRef = useRef()
  const { modalConstructionKey } = useSelector((state) => state.component.modal)
  const [modalContent, setModalContent] = useState({ labelTitle: '', labelApplyButton: '', component: null } )

  useEffect(() => {
    switch (modalConstructionKey) {
      case 'profil-manager':
        setModalContent({
          labelTitle: 'profilManager.TITLE',
          labelApplyButton: 'SEND',
          component: <settings.ProfilManager ref={componentRef} />
        })
        break 
      case 'email-manager':
        setModalContent({
          labelTitle: 'emailManager.TITLE',
          labelApplyButton: 'SEND',
          component: <settings.EmailManager ref={componentRef} />
        })
        break
      case 'password-manager':
        setModalContent({
          labelTitle: 'passwordManager.TITLE',
          labelApplyButton: 'SEND',
          component: <settings.PasswordManager ref={componentRef} />
        })
        break
      case 'subscription-manager':
        setModalContent({
          labelTitle: 'subscriptionManager.TITLE',
          labelApplyButton: 'SEND',
          component: <settings.SubscriptionManager ref={componentRef} />
        })
        break
      default:
        break 
    }
  }, [modalConstructionKey])

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