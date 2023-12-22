import { useTranslation } from 'react-i18next'
import { SquareIcon } from '../../assets'

const Board = ({ children, title, subtitle }) => {
  const { t } = useTranslation()

  return (
    <div id="layout-board">
      <div className="board_head">
        <div>
          <SquareIcon />
          <h1>{ t(title) }</h1>
        </div>
        <div>
          <span>{ subtitle.left }</span>
          <span>{ subtitle.rigth }</span>
        </div>
      </div>
      <div className="board_body">
        { children }
      </div>
    </div>
  )
}

export default Board