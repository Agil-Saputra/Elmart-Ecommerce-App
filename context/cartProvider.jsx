import { useContext, useReducer, useState } from 'react'
import { createContext } from 'react'
import { cartReducer } from './cartReducer'
import { useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const Cart = createContext()

const CartProvider = ({children}) => {

  const [value, setValue] = useLocalStorage("cart", [])
  const INITIAL_STATE = {
    cart : value || []
  }

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  
  useEffect(() => {
    setValue(state.cart)
  }, [state.cart])
  
  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart]);
  return (
    <Cart.Provider value={{state, dispatch}}>
    {children}
    </Cart.Provider>
  )
}

export const cartState  = () => {
  return useContext(Cart)
}

export default CartProvider