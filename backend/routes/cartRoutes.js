import express from 'express'
import AuthMethod from '../middleware/Auth.js'
import { addToCart,removeFromCart,fetchCartData} from '../controller/cartController.js'

const cartroute=express.Router()

cartroute.post('/add',AuthMethod,addToCart)
cartroute.post('/remove',AuthMethod,removeFromCart)
cartroute.post('/fetch',AuthMethod,fetchCartData)

export default  cartroute