import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StaticRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StaticRouter location={url}>
    <App />
  </StaticRouter>,
)
