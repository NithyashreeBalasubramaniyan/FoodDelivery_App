import {usermodel} from '../models/UserModel.js'

const addToCart=async(req,res)=>{
    try{
        const {itemId} =req.body
        const userId=req.body.userId
        const userdata= await usermodel.findById(userId)
        const cartData=userdata.cartData
        if(!cartData[itemId]){
            cartData[itemId]=1
        }
        else{
            cartData[itemId]+=1
        }
        
        await usermodel.findByIdAndUpdate(userId,{cartData})
        return res.json({success:true,message:"item added"})
    }

      catch(error){
        return res.json({success:false,message:'error'})
      } 
        

}

const removeFromCart=async(req,res)=>{
    try{
        const {itemId} =req.body
        const userId=req.body.userId
        const userdata= await usermodel.findById(userId)
        const cartData=userdata.cartData
        cartData[itemId]-=1
        
        await usermodel.findByIdAndUpdate(userId,{cartData})
        return res.json({success:true,message:"item removed"})
    }

      catch(error){
        return res.json({success:false,message:'error'})
      } 
        


}

const fetchCartData=async(req,res)=>{
     try{
        const userId=req.body.userId
        const userdata= await usermodel.findById(userId)
        const cartData=userdata.cartData
        return res.json({success:true,cartData})
    }
    catch(error){
        return res.json({success:false,message:"error"})
    }
}

export {addToCart,removeFromCart,fetchCartData}