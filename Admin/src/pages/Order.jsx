import React, { useEffect, useState } from 'react'
import './Order.css'
import {assets} from '../assets/assets'
import axios from 'axios'
export const Order = ({url}) => {
  const [order,setOrder]=useState([])
  const fetchorderlist=async()=>{
    const response=await axios.get(url+'/api/order/listorder')
    if(response.data.success){
      setOrder(response.data.data)
      console.log(response.data.data)
    }
    else{
      console.log("error")

    }
  }
  const  statushandler=async(e,orderId)=>{
    const response=await axios.post(url+'/api/order/status',{orderId,
      status:e.target.value
    })
    if(response.data.success){
      fetchorderlist()
    }
  }
  useEffect(()=>{
    fetchorderlist()

  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order,index)=>{
          return(
          <div key={index} className="order-item">
              <img src={assets.parcel_icon} />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+ '  X  ' +item.quantity
                    }
                    else{
                       return item.name+ '  X  ' +item.quantity+"  ,   "
                    

                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstname+'  '+order.address.lastname}</p>
                <div className='order-item-address'>
                  <p>{order.address.street+" , "}</p>
                  <p>{order.address.city+" , "+order.address.state+' , ' +order.address.country+' , '+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>statushandler(e,order._id)} value={order.status}>
                <option value='food processing'>Food Processing</option>
                <option value='out of delivery'>Out of delivery</option>
                <option value='delivered'>Delivered</option>
              </select>


          </div>
        )})}
      </div>
    </div>
  )
}
