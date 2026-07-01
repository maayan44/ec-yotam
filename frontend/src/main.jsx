import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

console.log(`
%c  Hey, you found this. 👀
%c  ciano.webs  
%c  Built with React + Vite
%c  Like what you see? Let's build something together.
%c  https://ciano-webs.vercel.app
`, 
'background: #C0001A; color: #fff; font-family: monospace; font-size: 14px; font-weight: bold; padding: 6px 12px;',
'color: #f0f0f0; font-family: monospace; font-size: 14px; font-weight: bold; padding: 2px 0;',
'color: #666666; font-family: monospace; font-size: 12px; padding: 2px 0;',
'color: #666666; font-family: monospace; font-size: 12px; padding: 2px 0;',
'color: #C0001A; font-family: monospace; font-size: 12px; padding: 2px 0;'
)

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </HelmetProvider>
)