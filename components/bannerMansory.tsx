import * as React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './card/productCard';

export interface IAppProps {
}

export default function BannerMansonry (props: IAppProps) {
  return (
    <section className='mt-6 md:mt-16 shadow-xl p-4 rounded-xl'>
    <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6'>Get 70% off</p>
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
    </Grid>
    </section>
  );
}
