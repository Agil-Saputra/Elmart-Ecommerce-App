import { useContext, useReducer, } from 'react'
import { createContext } from 'react'
import { cartReducer } from './Reducer'
import { useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const Context = createContext()

const Provider = ({children}) => {

  const [value, setValue] = useLocalStorage("cart", [])
  const INITIAL_STATE = {
    cart : value || [],
    searchQuery: ""
  }

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  
  useEffect(() => {
    setValue(state.cart)
  }, [state.cart])
  
  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart]);
  return (
    <Context.Provider value={{state, dispatch}}>
    {children}
    </Context.Provider>
  )
}

export const cartState  = () => {
  return useContext(Context)
}

export default Provider