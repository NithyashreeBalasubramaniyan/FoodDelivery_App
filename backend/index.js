import  express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config(); 

import { connectDB } from './config/Db.js'

import foodRoute from './routes/FoodRoutes.js'
import userRoute from './routes/UserRoutes.js'
import cartroute from './routes/cartRoutes.js'
import orderroute from './routes/orderRoutes.js'


//app config

const app=express()
const port=process.env.PORT||4000

//middleware   

app.use(express.json())
app.use(cors({
  origin: 'https://fooddelivery-app-frontend-ax6p.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

connectDB()

app.use('/api/food',foodRoute)

app.use('/api/user',userRoute)

app.use('/api/cart',cartroute)

app.use('/api/order',orderroute)

app.get('/ping', (req, res) => {
  res.send("pong");
});

//api
app.use('/images',express.static('uploads'))
app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port,()=>{
    console.log(`server running at port http://localhost:${port}`)
})
