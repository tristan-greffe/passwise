import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { setModal } from '../../store/componentSlice'

const SettingsCard = ({ id, title, description, Icon }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  
  const openModal = (modalConstructionKey) => { dispatch(setModal({ open: true, modalConstructionKey })) }

  if (_.endsWith(id, 'manager')) {
    // Square card
    return (
      <div id={id} onClick={() => openModal(id)}>
        <div>
          <Icon />
        </div>
        <b>{ t(title) }</b>
      </div>
    )
  } else {
    // Rectangle card
    return (
      <div id={id} onClick={() => openModal(id)}>
        <Icon />
        <div>
          <b>{ t(title) }</b>
          <small>{ t(description) }</small>
        </div>
      </div>
    )
  }
}

const SectionSettings = ({ id, title, IconTitle, content }) => {
  const { t } = useTranslation()

  return (
    <section id={id}>
      <div>
        <IconTitle />
        { t(title) }
      </div>
      <div>
        {content.map((element) => (
          <SettingsCard key={element.title} {...element} />
        ))}
      </div>
    </section>
  )
}

export default SectionSettings