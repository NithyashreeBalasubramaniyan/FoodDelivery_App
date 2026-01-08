import mongoose  from "mongoose"
const mongo_db_string ='mongodb+srv://Nithyashree:nithy123456789@cluster0.ryx2vgt.mongodb.net/?appName=Cluster0'
 
export const connectDB=async()=>{
    await mongoose.connect(mongo_db_string).then(()=>{
        console.log('Database connected')
    })
}