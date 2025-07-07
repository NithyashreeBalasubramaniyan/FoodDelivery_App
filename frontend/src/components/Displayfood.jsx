import React, { useContext } from 'react'
import { StoreContext } from '../StoreContext'
import './Displayfood.css'
import { FoodItem } from './FoodItem'
export const Displayfood = ({category}) => {
const {foodlist} =useContext(StoreContext)
  return (
    <div className='food-display-section'>
      <h1>Discover the flavors you crave!</h1>
      <p>From sizzling starters to sweet treats, our handpicked dishes are made to satisfy every craving. Browse through our vibrant selection and order your favorites with just a tap!</p>
      

        <div className='food-display'>
          {foodlist.map((item)=>{
           if(category==='all'||category===item.category ){
          return(
          <FoodItem  key={item._id} id={item._id} image={item.image} name={item.name} description={item.description} price={item.price}/>
           )}
        })}
       </div>
        
    </div>
  )
}
