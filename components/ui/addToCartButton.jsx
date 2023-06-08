import {useState}from 'react'
import { Button } from '@mui/material'
import { AddShoppingCartRounded } from '@mui/icons-material'
import { State } from '@/context/Provider'

const AddToCartButton = ({data, amount, variant, variantError}) => {
    const {
        state : { cart },
        dispatch
    } = State()

    function handleClick () {
            dispatch({
                type :  "ADD_TO_CART",
                payload : {
                    data : data,
                    amount : amount,
                    variant : variant
                }
            })
        }
    

  return (
   <>
     <Button
     onClick={handleClick}
         startIcon={<AddShoppingCartRounded />}
         fullWidth
         disabled={variantError}
         variant="contained"
         className="bg-primary shadow-md text-white text-[10px] md:text-[12px]"
       >
        Add to cart
       </Button>
       
   </>
  )
}

export default AddToCartButton