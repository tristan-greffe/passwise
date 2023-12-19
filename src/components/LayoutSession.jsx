import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Form from './form/Form'

function LayoutSession ({ data, fields, onSubmit, onFieldChanged }) {
  const { t } = useTranslation()

  return (
    <div id={data.id}>
      <span>{ t(data.title)}</span>
      <div>
        <h1>Espace <b>sécurisé</b></h1>
        <div>
          <div className="locker">
            <div className="locker_head"><div>{ t(data.title)}</div></div>
            <p className="text-center text-xs mb-6">{ t(data.message)}</p>
            <Form fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} buttonLabel={data.buttonLabel} />
          </div>
          { data.action && <div className="locker_action mt-6">
            <Link to={data.action.to}>{ t(data.action.label)}</Link>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default LayoutSession