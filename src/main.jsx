import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

// Service worker disabled temporarily for debugging
// import { registerSW } from 'virtual:pwa-register'
// registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/GestioneFinanze/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
