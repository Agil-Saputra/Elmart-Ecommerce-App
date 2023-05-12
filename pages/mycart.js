import React from 'react';
import { NoSsr } from '@mui/material';
import { cartState } from '@/context/cartProvider';
import Image from 'next/image';


const mycart = () => {
  const {state : {cart}} = cartState()

  return (
    <NoSsr>
      <div className="margin-top-global main-margin flex justify-between">
<div className='border-2'>information to checkout</div>

      <div className='border-2'>
          {
            cart.map(item => {
              const {
                title, 
                slug, 
                price, 
                quantity, 
                choosedVariant, 
                variants, 
                productImages } = item
              return (
                <div>
                  <Image
                    src={'https:' + productImages[0].fields.file.url}
                    alt={productImages[0].fields.title}
                    width={100}
                    height={100}
                    priority
                  />
                </div>
              )
            })
          }
      </div>
      </div>
    </NoSsr>
  )
}

export default mycart