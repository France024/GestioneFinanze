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
<<<<<<< HEAD
    <BrowserRouter basename={import.meta.env.BASE_URL}>
=======
    <BrowserRouter basename="/GestioneFinanze/">
>>>>>>> 913fdc83ae71e4a77ded90877db796872e6c5612
      <App />
    </BrowserRouter>
  </React.StrictMode>
)