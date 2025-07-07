import React, { createContext, useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../assets/assets'
import { StoreContext } from '../StoreContext'
export const FoodItem = ({id,image,name,description,price}) => {
  const { cartItem,
        setCartItem,
        addCart,
        removeCart,url}=useContext(StoreContext)

  return (
    <div className='food-item-container'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={`${url}/images/${image}`} />
             {(cartItem && cartItem[id] > 0) ? (
              <div className='order-btn'>
                <img onClick={() => removeCart(id)} src={assets.remove_icon_red} />
                <span>{cartItem[id]}</span>
                <img onClick={() => addCart(id)} src={assets.add_icon_green} />
              </div>
            ) : (
              <img onClick={() => addCart(id)} className='food-add-icon' src={assets.add_icon_white} />
            )}

       
        </div>
        <div className="food-item-info">
            <div className="name-and-rating">
                    <h4 className='food-name'>{name}</h4>
                    <img  src={assets.rating_starts} />
            </div>
            <p className='food-description'>{description}</p>
            <span className='food-price'>${price}</span>
        </div>
    </div>
  )
}
