import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Meta, layout } from '../components'
import { api } from '../api'
import { FolderIcon, KeyIcon, UserIcon, SquareIcon, StarsIcon, ItemsIcon } from '../assets'

const Vault = () => {
  // Data
  const pathname = useLocation()
  const { t } = useTranslation()
  const [passwords, setPasswords] = useState([])
  const [categories, setCategories] = useState([])
  const { user } = useSelector(state => state.user)

  // Hooks
  useEffect(() => {
    console.log(pathname)
    async function fetchInitialState () {
      let data = await api.service('api/categories').find({ query: { userId: user._id }})
      setCategories(data.data)
      data = await api.service('api/passwords').find({ query: { userId: user._id }})
      setPasswords(data.data)
    }
    fetchInitialState()
  }, [])

  return (
    <>
      <Meta title="vault.META_TITLE" description="vault.META_DESCRIPTION" />
      <layout.Layout>
        <layout.Board >
          <div id="vault-categories">
            <div className="vault_head">
              <SquareIcon />
              {t('vault.CATEGORIES')}
            </div>
            <div className="vault-categories_body">
              <div>
                <ItemsIcon />
                <span>{t('vault.ITEMS')}</span>
              </div>
              <div>
                <StarsIcon />
                <span>{t('vault.FAVORITES')}</span>
              </div>
              {categories.map((category, index) => (
                <div key={index}>
                  <FolderIcon />
                  <span>{category.name}</span>
                </div>
              ))}              
            </div>
          </div>
          <div id="vault-elements">
            <div className="vault_head">
              <KeyIcon />
              {t('vault.PASSWORD')}
            </div>
            <div className="vault-elements_body">
              {passwords.map((password, index) => (
                <div key={index}>
                  <div>
                    <div><div>{_.first(password.name)}</div></div>
                    <span>{password.name}</span>
                  </div>
                  <div className="file-actions">
                    <div className="action-container type-container unselectable"><UserIcon /></div>
                    <div className="action-container type-container unselectable"><KeyIcon /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </layout.Board>
      </layout.Layout>
    </>
  )
}

export default Vault