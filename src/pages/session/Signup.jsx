import { useTranslation } from 'react-i18next'
import { Meta } from '../../components'

function Signup() {
  const { t } = useTranslation()

  return (
    <>
      <Meta title="signup.META_TITLE" description="signup.META_DESCRIPTION" />
      <div>Signup</div>
    </>
  )
}

export default Signup