import { useTranslation } from 'react-i18next'

function Home () {
  const { t } = useTranslation()

  return (
    <div>{t('CANCEL')}</div>
  )
}

export default Home