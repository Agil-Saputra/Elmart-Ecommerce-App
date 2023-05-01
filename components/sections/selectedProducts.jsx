import ProductCard from '../card/productCard';
import { Grid} from '@mui/material';

export default function selectedProducts ({data}) {
  return (
    <section className='max-md:mt-6 shadow-md rounded-md  main-margin'>
    <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6 sticky'>Best Deal for you!!</p>
  <div className='grid grid-flow-row overflow-auto h-[40rem]'>
      <Grid  spacing={2} container >
        {data.map(item => {
        const {title, price, description, productImages, categoryref, slug, selected} = item.fields
        return selected ? (
       <Grid item xs={12} sm={6} md={3} key={slug}>
          <ProductCard
           title={title}  
           price={price} 
           desc={description} 
           image={productImages[0].fields.file.url}
           category={categoryref[0].fields.title}
           slug={slug}
           />
        </Grid>
        ) : 
       null
      })}
      </Grid>
  </div>
    </section>
  );
}
