import { usermodel } from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}




const registerUser =async(req,res)=>{

    const {name,email,password}=req.body
    const exist= await usermodel.findOne({email})
    if(exist){
        return res.json({success:false,message:'user already exists'})
    }
    if(!validator.isEmail(email)){
          return res.json({success:false,message:'Invalid email id'})
    }
    if(password.length <8){
          return res.json({success:false,message:'insuffient password length'})
    }

    const salt=await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt)

    const newuser=new usermodel ({
        name:name,
        email:email,
        password:hashedpassword,
      
    })
    //  await usermodel.updateMany(
    //       { cartData: { $exists: false } },
    //       { $set: { cartData: {} } }
    //    );
      
    try{
       const user= await newuser.save()
       const token=createtoken(user._id)
       return res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:'error'})
    }

}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await usermodel.findOne({ email });
    if (!userExist) {
      return res.json({ success: false, message: "Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });

    }

    const token = createtoken(userExist._id);
   
    return res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Server error" });
  }
};


export {registerUser,loginUser}