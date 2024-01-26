import { useSelector } from 'react-redux'
import { Meta, layout, settings } from '../components'
import config from '../config'

const Settings = () => {
  const { user } = useSelector(state => state.user)
  const passwordSettings = config.passwordSettings
  const accountSettings = config.accountSettings

  return (
    <>
      <Meta title='settings.META_TITLE' description='settings.META_DESCRIPTION' />
      <layout.Layout>
        <layout.Board title='settings.TITLE' subtitle={{ left: user.name, rigth: user.email }}>
          <settings.Section {...passwordSettings} />
          <settings.Section {...accountSettings} />
        </layout.Board>
      </layout.Layout>
    </>
  )
}

export default Settings
