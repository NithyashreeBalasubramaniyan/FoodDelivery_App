import React, { useState } from 'react'
import axios from 'axios'
import './Orderplace.css'
import {useNavigate} from 'react-router-dom'
// import './CartItem.css'
import { useContext } from 'react'
import {StoreContext} from '../StoreContext'
export const Orderplace = () => {
   const {getsubtotal,token,foodlist,cartItem,url} =useContext(StoreContext)

   const [data,setData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    country:'',
    state:'',
    phone:'',
    zipcode:'',

   })
   const onChangeHandler=(event)=>{
    let {name,value}=event.target
    setData((data)=>({...data,[name]:value}))
   }

   const submitHandler=async(e)=>{
      e.preventDefault()
      let iteminfo
      const orderItem = foodlist
    .filter(item => cartItem[item._id] > 0)
    .map(item => ({
      ...item,
      quantity: cartItem[item._id]
    }));
    let orderdata={
      address:data,
      items:orderItem,
      amount:getsubtotal()+2,
    }
    let response = await axios.post(`${url}/api/order/placeorder`, orderdata, { headers: { token } })
    if(response.data.success){
      const {session_url}=response.data
      window.location.replace(session_url)
    }
    else{
      alert("error")
    }
    
   }

   const  navigate=useNavigate()
    const goToOrder=()=>{
        navigate('/orderplace')
    }
   return (
    <div >
      <form  className='orderplace-session' onSubmit={submitHandler}>
        <div className="delivery-details">
          <h2 className='delivery-title'>Delivery Details</h2>
          <div className="double-input">
            <input name="firstname" onChange={onChangeHandler} type='text' placeholder='First Name' />
            <input name="lastname" onChange={onChangeHandler} type='text' placeholder='Last Name' />
          </div>
          <input name="email" onChange={onChangeHandler} className='single-input' type='text' placeholder='Email' />
          <div className="double-input">
            <input name="street" onChange={onChangeHandler} type='text' placeholder='Street' />
            <input name="zipcode" onChange={onChangeHandler} type='text' placeholder='Zip-code' />
          </div>
          <div className="double-input">
            <input name="city" onChange={onChangeHandler} type='text' placeholder='City' />
            <input name="state" onChange={onChangeHandler} type='text' placeholder='State' />
          </div>
          <input name="phone" onChange={onChangeHandler} className='single-input' type='text' placeholder='Phone No.' />
        </div>

        <div className="cart-info">
          <h2>Cart info</h2>
          <div className="cart-block cart-subtotal">
            <h4>Sub Total</h4>
            <span>${getsubtotal()}</span>
          </div>
          <div className="cart-block delivery">
            <h4>Delivery fee</h4>
            <span>${getsubtotal() === 0 ? 0 : 2}</span>
          </div>
          <div className="cart-block total">
            <h4>Total</h4>
            <span>${getsubtotal() === 0 ? 0 : getsubtotal() + 2}</span>
          </div>
          <button type='submit' className='submit-to-checkout'>Proceed to checkout</button>
        </div>
      </form>
    </div>
  );
};