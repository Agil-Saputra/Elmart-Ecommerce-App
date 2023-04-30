import ProductCard from '../card/productCard';
import { Grid} from '@mui/material';

export default function Trending () {

  return (
    <section className='mt-6 md:mt-16 shadow-lg p-4 rounded-xl main-margin'>
    <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6'>Trending Products</p>
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
