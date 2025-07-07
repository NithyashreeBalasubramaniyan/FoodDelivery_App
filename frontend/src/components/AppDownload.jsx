import React from 'react'
import './AppDownload.css'
import { assets } from '../assets/assets'
export const AppDownload = () => {
  return (
    <div className='appdownload-section' id='mobile-app'>
        <h1 >Get the App & Order in Seconds</h1>
        <div className="appdownload-img">
             <img src={assets.play_store}/>
               <img src={assets.app_store} />
        </div>
    </div>
  )
}
