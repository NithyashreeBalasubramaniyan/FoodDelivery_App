import { useState } from 'react'
import axios from 'axios'
import upload_img from '../assets/upload_area.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Add.css'
export const Add = ({url}) => {
    
   const[img,setImg]=useState(false) 
   const[data,setData]=useState({
    name:'',
    description:'',
    price:0,
    category:'',
   })

   const onChangeHandler=(event)=>{
    let {name,value}=event.target
    setData((data)=>({...data,[name]:value}))
   }

   const submitHandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('name',data.name)
        formdata.append('description',data.description)
        formdata.append('category',data.category)
        formdata.append('price',data.price)
        formdata.append('image',img)
        for (let [key, value] of formdata.entries()) {
        console.log(key, value);
        }
        try{
                const response=await axios.post(`${url}/api/food/add`,formdata)
                console.log(formdata,response)
               if(response.data.success){
                seData({
                    name:'',
                    description:'',
                    price:0,
                    category:'',
                    
                })
                setImg(false)
                toast.success("Added successfully! 🎉");

             } 
        }
        
        catch (error) {
             console.error("❌ Error uploading food:", error);
             toast.error("Failed to add food item.");
        }

   }

  return (
    <form  onSubmit={(e)=>submitHandler(e)} className='add-block'>
        <div className="flex-col img-input">
            <p >upload image</p>
            <label htmlFor='image'>
                <img className='add-food-img'  src={!img?upload_img:URL.createObjectURL(img)} />
            </label>
            <input onChange={(e)=>setImg(e.target.files[0])} id='image' name='image'  type='file' hidden />
        </div>
        <div className="flex-col">
            <p>product name</p>
            <input onChange={onChangeHandler} type='text'  name='name'  value={data.name} required placeholder='type here' />
        </div>
         <div className="flex-col">
            <p>product description</p>
            <textarea  onChange={onChangeHandler} name='description'  value={data.description} rows={6} required placeholder='type content here' />
        </div>
        <div className="flex-row">
             <div className="flex-col">
                <p>product category</p>
                <select  onChange={onChangeHandler} className='select-input' value={data.category} name='category'>
                    <option value="" disabled>Select category</option>
                    <option value="Salad">salad</option>
                    <option value="Rolls">rolls</option>
                    <option value="Deserts">deserts</option>
                    <option value="Sandwich">sandwich</option>
                    <option value="Cake">cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">noodles</option>
                </select>
            </div>
            <div className="flex-col">
                    <p>product price</p>
                    <input  onChange={onChangeHandler} value={data.price} type='number' name='price' required placeholder='$20' />
            </div>
        </div>
        <button  className='add-btn' type='submit' >Add</button>
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
    </form>
  )
}
