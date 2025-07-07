import express from 'express'
import multer from 'multer'
import {addfood,listfood,removefood} from '../controller/foodController.js'
const foodRoute=express.Router()

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}_ ${file.originalname}`)
    }
})
const upload=multer({storage:storage})

foodRoute.post('/add',upload.single("image"),addfood)
foodRoute.get('/list',listfood)
foodRoute.post('/remove',removefood)


export default foodRoute