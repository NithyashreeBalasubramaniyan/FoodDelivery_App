import { Route, Routes } from 'react-router-dom'
import {Navbar} from './component/Navbar'
import {Sidebar} from './component/Sidebar'
import { List } from './pages/List'
import { Add } from './pages/Add'
import { Order } from './pages/Order'

function App() {
  const url='http://localhost:4000'
  return (
    <>
      <Navbar />
      <div className='admin-structure'>
         <Sidebar />
         <div className='admin-panel'>
            <Routes>
                <Route path='/' element={<List url={url} />} />
                <Route path='/add' element={<Add url={url} />} />
                <Route path='/list' element={<List  url={url} />} />
                <Route path='/order' element={<Order  url={url} />} />

            </Routes>
         </div>
        
      </div>
    </>
  )
}

export default App
