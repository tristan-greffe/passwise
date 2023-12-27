import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setModal } from '../../store/componentSlice'
import { SquareIcon, PlusIcon } from '../../assets'

const Board = ({ children, title, subtitle }) => {
  // data
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [action, setAction] = useState(false)
  const { t } = useTranslation()
  const openModal = (modalConstructionKey) => { dispatch(setModal({ open: true, modalConstructionKey })) }

  return (
    <div id="layout-board">
       { title && <div className="board_head">
        <div>
          <SquareIcon />
          <h1>{ t(title) }</h1>
        </div> 
        { subtitle && <div>
          <span>{ subtitle.left }</span>
          <span>{ subtitle.rigth }</span>
        </div>}
      </div>}
      <div className="board_body">
        { children }
      </div>
      {pathname === '/vault' && <div className={`${action ? "board_action opened" : "board_action"}`}>
        <div className="vault-action_btn" onClick={() => setAction(!action)}>
          <PlusIcon />
        </div>
        <div className="vault-action_list">
          <div onClick={() => openModal('create-password')}>{t('vault.PASSWORD')}</div>
          <div onClick={() => openModal('create-categorie')}>{t('vault.CATEGORIE')}</div>
        </div>
      </div>}
    </div>
  )
}

export default Board