import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import './List.css'
export const List = ({url}) => {
   const [foodList, setFoodList] = useState([])
  const listfooder=async()=>{

      let res=await axios.get(`${url}/api/food/list`)
      setFoodList(res.data.data)
      console.log(res.data.data)
    
    
  }
  useEffect(()=>{
       listfooder()
  },[])
 
  const remove_item=async(id)=>{
      await axios.post(`${url}/api/food/remove`,{_id:id})
      await listfooder()
      toast.info("Item removed successfully 🗑️")
  }


  return (
    <div className='list-fooder'>
        <div className="formater list-title">
          <b>item</b>
          <b>title</b>
          <b>category</b>
          <b>price</b>
          <b>remove</b>
        </div>
        <div className="list-foods">
          {foodList.map((item)=>{
            return(
                <div key={item._id} className="formater list-items">
                    <img className='list-img' src={`${url}/images/${encodeURIComponent(item.image)}`} />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p className='remove-btn' onClick={()=>remove_item(item._id)} >X</p>
                </div>
                

            )
          })}
        </div>
         <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
        />
    </div>
  )
}
