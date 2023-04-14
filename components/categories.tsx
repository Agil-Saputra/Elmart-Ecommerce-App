import * as React from 'react';
import CategoryCard from './card/categoryCard';
import { Grid } from '@mui/material';


export default function FeaturedCategories () {

  return (
   <section className='mt-6 md:mt-16 shadow-2xl mb-10 rounded-xl p-4'>
    <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6 '>All Categories</p>
    <Grid container className='border-l-2 border-t-2 border-solid'>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CategoryCard />
      </Grid>
    </Grid>
    </section>

  );
}
