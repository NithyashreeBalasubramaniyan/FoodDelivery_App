import mongoose  from "mongoose"
const mongo_db_string ='mongodb+srv://balanithyashree2004:1311@cluster0.lhuzddw.mongodb.net/FoodDeliveryApp'
 
export const connectDB=async()=>{
    await mongoose.connect(mongo_db_string).then(()=>{
        console.log('Database connected')
    })
}