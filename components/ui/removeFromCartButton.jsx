import { IconButton } from '@mui/material'
import React from 'react'
import { cartState } from '@/context/cartProvider'
import { Delete } from '@mui/icons-material'

const removeFromCartButton = ({slug}) => {
    const {state : {cart}, dispatch} = cartState()
  return (
    <IconButton
    onClick={() => {
        dispatch({
            type : "REMOVE_FROM_CART",
            payload : slug
        })
    }}
    className='text-red-400'>
    <Delete fontSize='small'/>
    </IconButton>
  )
}

export default removeFromCartButton