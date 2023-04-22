import { Grid } from '@mui/material';
import * as React from 'react';
import logo from '../../assets/logo.svg'
import ListMenu from './list';
import Image from 'next/image';

export interface IfooterProps {
}

export default function footer (props: IfooterProps) {
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
      "Shopcart Help",
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


  return (
    <Grid component='footer' container spacing={4} className='main-padding mt-10 pb-5 bg-primary bg-opacity-[0.85] text-white'>
      <Grid {...itemsProps}>
        <div>
          <Image width={100} height={30} src={logo} alt="logo" className='bg-white rounded-lg'/>
          <p className='max-w-[20ch] my-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae tempora reiciendis debitis consectetur accusamus quod dolores error maiores doloribus omnis!</p>
          {/* icon */}
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
