import { BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import StoreContextProvider from './StoreContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
        <App />
  </StoreContextProvider>
  
  </BrowserRouter>


)
