import React, { useState } from 'react'
import {Header} from '../components/Header'
import { ExploreMenu } from '../components/ExploreMenu'
import { Displayfood } from '../components/Displayfood'
import { AppDownload } from '../components/AppDownload'
import { LoginPopup } from '../components/LoginPopup'

export const Home = ({showlogin,setShowlogin}) => {
  const [category,setCategory]=useState("all")
  
  return (
    <div>
      {showlogin && <LoginPopup  setShowlogin={setShowlogin} />}
      <Header />
      <ExploreMenu  category={category} setCategory={setCategory} />
      <Displayfood category={category}/>
      <AppDownload />
    </div>
  )
}
