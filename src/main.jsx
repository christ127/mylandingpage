import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";      // Tailwind base + utilities
import "./styles/buttons.css"; // Your custom classes using @apply


import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
