import React from 'react'
import './Navbar.css'
import logo from  '../assets/logo.png'
import profile_img from '../assets/profile_image.png'
export const Navbar = () => {
  return (
    <div className='nav-admin'>
        <div className="nav-admin-logoblock">
            <img className='logo-img' src={logo} />
            <img className='profile-img' src={profile_img} />
        </div>
        <hr/>
    </div>
  )
}
