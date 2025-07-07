import React from 'react'
import { assets } from '../assets/assets'
import './Footer.css'
export const Footer = () => {
  return (
    
    <div className='footer' id='footer'>

        <div className="footer-content">
            <div className="footer-left-content">
                <img src={assets.logo} />
                <p className='footer-para'>Delicious food delivered to your doorstep, fast and fresh.<br/> From spicy bites to sweet delights<br/> — we've got your cravings covered!</p>
                <div className='contact-img'> 
                    <img src={assets.linkedin_icon}/>
                    <img src={assets.twitter_icon} />
                    <img src={assets.facebook_icon}/>
                </div>
            </div>
            <div className="footer-center-content">
                <h2>Company</h2>
                <ul className='contact-list'>
                    <li>Home</li>
                    <li>Menu</li>
                    <li>Place Oder</li>
                    <li>Contact us</li>
                </ul>
            </div>
            <div className="footer-right-content">
                <h2>Contact Info</h2>
                 <p>Email: support@foodieexpress.com</p>
                <p>Phone: +91 98765 43210</p>
            </div>
           
        </div>
        <hr className='break'></hr>
        <h4 className='copyright-content'>&copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.</h4>
    </div>
    )
}
