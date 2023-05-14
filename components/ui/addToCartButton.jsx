import React from 'react'
import { Button } from '@mui/material'
import { AddShoppingCartRounded } from '@mui/icons-material'
import { cartState } from '@/context/cartProvider'

const AddToCartButton = ({data, amount, variant, added}) => {
    const {
        state : { cart },
        dispatch
    } = cartState()

    const obj = {
        amount : 1
    }

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
    <Button
    onClick={handleClick}
        startIcon={<AddShoppingCartRounded />}
        fullWidth
        variant="contained"
        className="bg-primary shadow-md text-white text-[10px] md:text-[12px]"
      >
       {/* {added ?  'Added to cart' : 'Add to cart'} */}
       Add to cart
      </Button>
  )
}

export default AddToCartButton