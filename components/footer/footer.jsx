import { Grid, Stack } from '@mui/material';
import * as React from 'react';
import ListMenu from './list';
import Image from 'next/image';

import logo from '../../assets/logoElmart.svg'
import stripe from '../../assets/payment/stripe.svg'
import gpay from '../../assets/payment/googlepay.svg'
import mastercard from '../../assets/payment/mastercard.svg'
import paypal from '../../assets/payment/paypal.svg'
import visa from '../../assets/payment/visa.svg'


export default function footer () {
    const about = [
      "About Elmart",
      "Careers",
      "News & Blog",
      "Help",
      "Press Center",
      "Shop By Location",
      "Shopcart Brands",
      "Affiliate & Partners",
      "Ideas & Guides",
    ]
    const services = [
      "Gift Card",
      "Mobile App",
      "Shipping & Delivery",
      "Order Pickup",
      "Account Signup",
    ]
    const help = [
      "Elmart Help",
      "Returns",
      "Track Orders",
      "Contact Us",
      "Feedback",
      "Security & Fraud",
    ]

    const itemsProps = {
      item : true,
      xs: 6,
      sm : 4,
      md : 3,
    }


    const paymentLogo = [
      stripe,
      mastercard,
      paypal,
      gpay,
      visa,
    ]


  return (
    <Grid component='footer' container spacing={4} className='main-padding mt-10 pb-5 bg-primary bg-opacity-[0.85] text-white'>
      <Grid {...itemsProps}>
        <div>
          <Image width={100} height={30} src={logo} alt="logo" className='bg-white rounded-lg'/>
          <p className='max-w-[20ch] my-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae tempora reiciendis debitis consectetur accusamus quod dolores error maiores doloribus omnis!</p>
          {/* icon */}
          <Stack direction='row' spacing={1}>
            {paymentLogo.map((src, index) => (
              <Image key={index} src={src} width={40} height={30} alt='payment-logo' className='w-[40px] h-[30px] p-1 rounded-sm bg-white'/>
            ))}
          </Stack>
        </div>
      </Grid>
        
     <Grid {...itemsProps}>
         <ListMenu menus={about} title='About Us'/>
     </Grid>

     <Grid {...itemsProps}>
           <ListMenu menus={services} title='Services'/>
    </Grid>

     <Grid {...itemsProps}>
      <ListMenu menus={help} title='Help'/>
     </Grid>

    </Grid>
  );
}
