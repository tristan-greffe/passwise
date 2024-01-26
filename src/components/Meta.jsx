import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function Meta ({ title, description }) {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>{t(title)}</title>
      <meta name='description' content={t(description)} />
    </Helmet>
  )
}

export default Meta
