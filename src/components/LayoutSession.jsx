import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { resendVerifySignup } from '../utils/utils.account'
import { Logo } from '../assets'
import Form from './form'

function LayoutSession ({ data, fields, onSubmit, onFieldChanged }) {
  const { t } = useTranslation()
  const { user } = useSelector(state => state.user)

  async function resendToken () {
    try {
      await resendVerifySignup(user.email)
      toast.success(t('verifyEmail.RESEND_TOKEN_SUCCESS'))
    } catch (error) {
      toast.error(t('verifyEmail.RESEND_TOKEN_ERROR'))
    }
  }

  return (
    <div id={data.id}>
      <span>{ t(data.title)}</span>
      <div>
        <Link to="/"><Logo /></Link>
        <div>
          <div className="locker">
            <h1 className="locker_head"><div>{ t(data.title)}</div></h1>
            <p className="text-center text-xs mb-6">{ t(data.message)}</p>
            <Form fields={fields} onSubmit={onSubmit} onFieldChanged={onFieldChanged} buttonLabel={data.buttonLabel} />
          </div>
          { data.action && <div className="locker_action mt-6">
            <Link to={data.action.to}>{ t(data.action.label)}</Link>
          </div>}
          { data.id === 'verify-email-session' && <div className="locker_action mt-6">
            <Link onClick={resendToken}>{ t('verifyEmail.ACTION')}</Link>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default LayoutSession