import express from 'express'
import {orderplacement, userOrder, verifyOrder,listOrder, updatestatus} from '../controller/orderController.js'
import AuthMethod from '../middleware/Auth.js'
const orderroute=express.Router()
orderroute.post('/placeorder',AuthMethod,orderplacement)
orderroute.post('/verify',verifyOrder)
orderroute.post('/userorders',AuthMethod,userOrder)
orderroute.get('/listorder',listOrder)
orderroute.post('/status',updatestatus)
export default orderroute