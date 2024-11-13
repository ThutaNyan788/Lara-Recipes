import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RouteProvide from './routes/router.jsx'
import { ContextProvdier } from './context/ContextProvdier.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvdier>
    <StrictMode>
      <RouteProvide />
    </StrictMode>
  </ContextProvdier>,
)
