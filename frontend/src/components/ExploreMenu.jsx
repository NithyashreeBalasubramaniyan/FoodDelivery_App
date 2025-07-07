import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../assets/assets'
export const ExploreMenu = ({category,setCategory}) => {
  return (
    <div id='explore-menu' >
          <div className='explore-title'>
            <h1 className='ExploreMenu-title'>Discover Delicious Choices</h1>
          <p className='explore-menu-text'> From spicy street food to sweet treats, explore our diverse menu curated to satisfy every craving. Your next favorite meal is just a tap away!</p>
          </div>
           <div className='explore-menu'>
            {menu_list.map((item,index)=>{
                return(
                  <div onClick={()=>setCategory((prev)=>(prev===item.menu_name?'all':item.menu_name ))} className='explore-menu-item' key={index}>
                      <img  className={category===item.menu_name?"activer explore-menu-img":"explore-menu-img"} src={item.menu_image} />
                      <h4 className='explore-menu-name'>{item.menu_name}</h4>
                  </div>
                )
            })}
        </div>
        <hr className='break-line'/>
    </div>
      
  )
}
