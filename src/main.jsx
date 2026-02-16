import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './components/App.jsx'
import { Auth } from './components/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth>
      <App />
    </Auth>
  </StrictMode>
)
