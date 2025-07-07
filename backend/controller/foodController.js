import foodmodel from '../models/FooddataModel.js'
import fs from 'fs'
const addfood=async(req,res)=>{
    if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required' });
    }
    let img_file=req.file.filename
    const food=new  foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:img_file,
        category:req.body.category,
    })
    try{
           await food.save()
           res.json({success:true,message:'food added'})
           console.log("food added to db")
    }
    catch(error){
        res.json({success:false,message:'error'})
    }
 
}

const listfood=async(req,res)=>{
    try{
           const food_detail=await foodmodel.find({})
           res.json({success:true,data:food_detail})
           console.log("food listed")
    }
    catch(error){
         res.json({success:true})
        console.log("error")
    }

}

const removefood=async(req,res)=>{
    const { _id } = req.body;
       try{
            const remove_food_info=await foodmodel.findById(_id)
            fs.unlink(`uploads/${remove_food_info.image}`,()=>{})
            await foodmodel.findByIdAndDelete(_id)
            res.json({success:true,message:'deleted successfully'})
       }
       catch(error){
        res.json({success:false,message:'error'})
       }
}


export {addfood,listfood,removefood}