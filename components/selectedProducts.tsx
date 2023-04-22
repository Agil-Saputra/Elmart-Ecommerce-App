import * as React from 'react';
import ProductCard from './card/productCard';
import { Grid} from '@mui/material';

export interface  selectedPeroductsProps {
}

export default function selectedPeroducts (props:  selectedPeroductsProps) {
  return (
    <section className='mt-6 md:mt-16 shadow-xl p-4 rounded-xl grid grid-flow-row overflow-y-auto overscroll-contain '>
    <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6 sticky'>Best Deal for you!!</p>
    <Grid  spacing={2} container>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard/>
      </Grid>
    </Grid>
    </section>
  );
}
