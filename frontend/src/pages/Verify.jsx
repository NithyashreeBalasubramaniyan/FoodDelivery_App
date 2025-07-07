import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { StoreContext } from '../StoreContext'
import axios from 'axios'

export const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
    const {url}=useContext(StoreContext)
    const navigate=useNavigate()
    const verifyPayment=async()=>{
        const res=await axios.post(url+'/api/order/verify',{success,orderId})
        navigate('/myorders')
        if(res.data.success){
               navigate('/myorders')

        }
        else{
            navigate('/')
        }

    }
    useEffect(()=>{
        verifyPayment()
    },[])
      

  return (
    <div>
        <div className='spinner'></div>
    </div>
  )
}
