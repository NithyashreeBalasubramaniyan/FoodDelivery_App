import React, { useContext } from 'react'
import {StoreContext} from '../StoreContext'
import { CartItem } from '../components/CartItem'
export const Cart = () => {
  const {cartItem,foodlist}=useContext(StoreContext)
  return (
    <div>
      <CartItem cartItem={cartItem} foodlist={foodlist} />
    </div>
  )
}
