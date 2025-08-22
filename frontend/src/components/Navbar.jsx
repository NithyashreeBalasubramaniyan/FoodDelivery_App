import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../StoreContext.jsx'
export const Navbar = ({setShowlogin}) => {
  const [active,setActive]=useState("home")
  const {token,setToken,getsubtotal}=useContext(StoreContext)
  const navigate=useNavigate()
  const logoutfun=()=>{
    localStorage.removeItem("token")
    setToken("")
   
  }

  return (
    <div className='navbar'>
      <img className='tomato' onClick={()=>navigate('/')} src={assets.logo} />
      <div className="nav-item">
        <ul className='nav-menu'>
          <Link to='/' onClick={()=>setActive('home')} className={active==='home'?"active-class":""}>Home</Link>
          <a href='#explore-menu' onClick={()=>setActive('menu')} className={active==='menu'?"active-class":""}>Menu</a>
          <a href='#mobile-app' onClick={()=>setActive('place-order')} className={active==='mobile-app'?"active-class":""}>Mobile App</a>
          <a href='#footer'  onClick={()=>setActive('contact-us')} className={active==='contact-us'?"active-class":""}>contact us</a>
        </ul>
      </div>
      <div className="nav-right">
        <img src={assets.search_icon}/>
        <div className="dot-container">
          <Link to='/cart'>
        <img  className='cart-icon' src={assets.basket_icon}/>
        </Link>
        {getsubtotal()>0 &&
        <div className='dot' ></div>}
      

        </div>
        
        
        {!token?
        <button onClick={()=>setShowlogin(true)}>Sign in</button>:
        <div className='profile-img'>
          <img  className='profile-imgs' src={assets.profile_icon} />
          <div className="profile-content">
             <ul className='list-value'>
              <li onClick={()=>navigate('/myorders')} className='profile-value'><img  src={assets.bag_icon} /><p>order list</p></li>
              <hr></hr>
              <li onClick={logoutfun} className='profile-value'><img  src={assets.logout_icon} /><p>log out</p></li>
            </ul>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
