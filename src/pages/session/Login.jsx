import { useTranslation } from 'react-i18next'
import { Meta } from '../../components'

function Login() {
  const { t } = useTranslation()

  return (
    <>
      <Meta title="login.META_TITLE" description="login.META_DESCRIPTION" />
      <div>Login</div>
    </>
  )
}

export default Login