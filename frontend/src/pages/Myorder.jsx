import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../StoreContext'
import axios from 'axios'
import { assets } from '../assets/assets'
export const Myorder = () => {

   const {url,token}=useContext(StoreContext)
   const [data,setData]=useState([]) 
   const fetchOrder=async()=>{
    const response=await axios.post(url+'/api/order/userorders',{},{headers:{token}})
    setData(response.data.data)
    console.log(response.data.data)
   }
   useEffect(()=>{
    if(token){
        fetchOrder();
    }

   },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
             <div className="grid-header">
            <div>Icon</div>
            <div>Items</div>
            <div>Amount</div>
            <div>Total</div>
            <div>Status</div>
            <div>Action</div>
            </div>
                    {data.map((order,index)=>{
                        return(
                    <div  key={index}className="my-orders-order grid-row">
                        <img src={assets.parcel_icon}/>
                        <p className='items-details-ptag'> {order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+"  X  "+item.quantity
                            }
                            else{
                                return item.name+"   X   "+item.quantity+"  ,  "
                            } 
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p className='status'><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
