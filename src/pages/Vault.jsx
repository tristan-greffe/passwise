import { Meta, layout } from '../components'

const Vault = () => {
  const subtitle = {
    left: 'Tristan Greffe',
    rigth: 'tristan.greffe@hotmail.com'
  }
  return (
    <>
      <Meta title="vault.META_TITLE" description="vault.META_DESCRIPTION" />
      <layout.Layout>
        <layout.Board title='settings.TITLE' subtitle={subtitle}>

        </layout.Board>
      </layout.Layout>
    </>
  )
}

export default Vault