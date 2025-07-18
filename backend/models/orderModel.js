import mongoose from 'mongoose'

const orderschema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    address:{type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now()},
    status:{type:String,default:'food processing'},
    payment:{type:Boolean,default:false}
})

const orderModel=mongoose.models.order||mongoose.model('order',orderschema)
export default orderModel