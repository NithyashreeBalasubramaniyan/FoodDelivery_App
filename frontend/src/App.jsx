import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import {Orderplace} from './pages/Orderplace'
import {Cart} from './pages/Cart'
import { Footer } from './components/Footer'
import { Verify } from './pages/Verify'
import { Myorder } from './pages/Myorder'
function App() {
  const[showlogin,setShowlogin]=useState(false)
  return (
    <>
      <Navbar setShowlogin={setShowlogin} /> 
      <Routes>
        <Route path='/' element={<Home showlogin={showlogin} setShowlogin={setShowlogin}/>} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/orderplace' element={<Orderplace/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<Myorder/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

