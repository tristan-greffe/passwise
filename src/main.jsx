import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { initializeApi } from './api.js'
import config from './config.js'
import App from './App.jsx'
import './scss/index.scss'
import './i18n'

initializeApi(config)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
