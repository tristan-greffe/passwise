import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { api } from '../../api'
import { FolderIcon, SquareIcon, StarsIcon, ItemsIcon } from '../../assets'

const Layout = () => { 
  // Data
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const { user } = useSelector(state => state.user)

  // Functions
  async function fetchInitialState () {
    const data = await api.service('api/categories').find({ query: { userId: user._id }})
    setCategories(data.data)
  }

  // Hooks
  useEffect(() => {
    fetchInitialState()
  }, [])

  return (
    <div id='layout-sidebar'>
      <div className="sidebar_head">
        <SquareIcon />
        {t('vault.CATEGORIES')}
      </div>
      <div className="sidebar_body">
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
  )
}

export default Layout