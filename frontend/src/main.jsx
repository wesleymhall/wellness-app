import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

// create root container for react app
// mount App component to root element in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* strict mode for react error handling */}
    <BrowserRouter> {/* browser router for routing */}
      <App /> {/* render App component */}
    </BrowserRouter>
  </StrictMode>
)
