import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// create root container for react app
// mount app component to root element in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* strict mode for react error handling */}
    <App /> {/* render App component */}
  </StrictMode>,
)
