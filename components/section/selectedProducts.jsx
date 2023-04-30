import ProductCard from '../card/productCard';
import { Grid} from '@mui/material';

export default function selectedPeroducts () {
  return (
    <section className='max-md:mt-6 shadow-lg p-4 rounded-xl grid grid-flow-row overflow-x-scroll snap-mandatory overscroll-contain main-margin'>
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
