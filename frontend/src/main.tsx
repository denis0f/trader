import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//importing the router for the Browser
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
     
 )
