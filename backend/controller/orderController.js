import orderModel from "../models/orderModel.js";
import {usermodel} from "../models/UserModel.js"
import Stripe from "stripe";

const homeurl='http://localhost:5173'
const orderplacement=async(req,res)=>{
    const stripe=new Stripe(process.env.STRIPE_SECRET)
    try{

        const neworder=new orderModel({

            userId:req.body.userId,
            items:req.body.items,
            address:req.body.address,
            amount:req.body.amount

        })
        await neworder.save()
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        const line_item=req.body.items.map((item)=>({

            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
            
        } ))
        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:'delivery charge'
                },
                unit_amount:2*100*80
            },
            quantity:1

        })
        const session=await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${homeurl}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${homeurl}/verify?success=false&orderId=${neworder._id}`
        }) 
        res.json({success:true,session_url:session.url})
        

    }
    catch(error){
        res.json({success:false,message:'error'})
        console.log(error)
    }

}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body
    try{
        if(success==='true'){
             await orderModel.findByIdAndUpdate(orderId,{payment:true})
             res.json({success:true,message:'paid'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
             res.json({success:true,message:'not paid'})
        }
    }
     catch(error){
        res.json({success:false,message:'error'})
        console.log(error)
    }
}
const userOrder=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }
     catch(error){
        res.json({success:false,message:'error'})
        console.log(error)
    }

}
const listOrder=async(req,res)=>{
    try{
        const orderslist=await orderModel.find({})
        res.json({success:true,data:orderslist})


    }
     catch(error){
        res.json({success:false,message:'error'})
        console.log(error)
    }

}
const  updatestatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:' status updated'})

    }
       catch(error){
        res.json({success:false,message:'error'})
        console.log(error)
    }


}

export {orderplacement,verifyOrder,userOrder,listOrder,updatestatus}