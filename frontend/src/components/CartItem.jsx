import React from 'react'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import './CartItem.css'
import { useContext } from 'react'
import { StoreContext } from '../StoreContext'
export const CartItem = ({cartItem,foodlist}) => {
    const {removeCart,getsubtotal,url} =useContext(StoreContext)
    const  navigate=useNavigate()
    const goToOrder=()=>{
        navigate('/orderplace')
    }
  return (
    <div>
        <div className="cart-item-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr className='cart-hr'/>
        <div className="cart-products">
            {foodlist.map((item,index)=>{
                if(cartItem[item._id]>0){
                 return(
                    <div key={index} className='cart-product'>
                        <img  className='cart-product-img' src={`${url}/images/${item.image}`} />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartItem[item._id]}</p>
                        <p>${item.price*cartItem[item._id]}</p>
                        <p onClick={()=>removeCart(item._id)}>X</p>
                    </div>
                )
                }
               
            })}
        </div>
        <div className="cart-details">
            <div className="cart-info">
                <h2 >Cart info</h2>
                <div className="cart-block cart-subtotal">
                    <h4>sub Total</h4>
                    <span>${getsubtotal()}</span>
                </div>
                <div className="cart-block delivery">
                    <h4>Delivery fee</h4>
                    <span>${getsubtotal()===0?0:2}</span>
                </div>
                <div className=" cart-block total">
                    <h4>Total</h4>
                    <span>${getsubtotal()===0?0:getsubtotal()+2}</span>
                </div>
                <button onClick={goToOrder} className='submit-to-checkout'>Proceed to checout</button>
            </div>
            <div className="promo-code-info">
                <p>if you have promocode,Please enter here</p>
                <div className="promo-code-block">
                    <input placeholder='passcode' type='password'/>
                    <button className='promo-code-btn'>Submit</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}
