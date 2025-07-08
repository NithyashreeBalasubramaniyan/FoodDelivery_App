import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
export const StoreContext=createContext(null)
const StoreContextProvider=(props) =>{


    const url='https://fooddelivery-app-k8kc.onrender.com'
    const [food_list,setFood_list]=useState([])
    const [cartItem,setCartItem]=useState({})
    const [token,setToken]=useState("")


    const addCart =async (itemId) => {
    setCartItem((prev) => {
      const currentQuantity = prev[itemId] || 0;
      return {
        ...prev,
        [itemId]: currentQuantity + 1
      };
    });
     if(token){
        await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
     }

  };

  const getsubtotal = () => {
  let temptotal = 0;

  for (const itemId in cartItem) {
    if (cartItem[itemId] > 0) {
      let item_info = food_list.find((prod) => prod._id === itemId);
      if (item_info) {
        temptotal += item_info.price * cartItem[itemId];
      }
    }
  }

  return temptotal;
};


  const removeCart =async(itemId) => {
    setCartItem((prev) => {
      const currentQuantity = prev[itemId] || 0;
      if (currentQuantity <= 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId]; // remove item from cart if 1 or less
        return updatedCart;
      } else {
        return {
          ...prev,
          [itemId]: currentQuantity - 1
        };
      }
    });
    await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})


  };

 const LoadcartData=async(token)=>{
 const response=await axios.post(url+'/api/cart/fetch',{},{headers:{token}})
 setCartItem(response.data.cartData)
 

 }

 
  const fetchFood=async()=>{
        const resp=await axios.get(`${url}/api/food/list`)
        setFood_list(resp.data.data)
        console.log(resp.data.data)
  }
  

  useEffect(()=>{
      async function Loader(){
         await  fetchFood();
          if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await LoadcartData(localStorage.getItem("token"))
          }
          
      }
      Loader();
      
  },[])
  


 

    const Context={
        foodlist:food_list,
        cartItem,
        setCartItem,
        addCart,
        removeCart,
        getsubtotal,
        url,
        token,
        setToken,
  
    };
    return(
        <StoreContext.Provider value={Context}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
