import ProductCard from "../card/productCard";
import { Grid } from "@mui/material";

export default function Trending({ data }) {
  return (
    <section className="mt-6 md:mt-[3.3rem] shadow-md rounded-md main-margin">
      <p className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">
        Trending Products
      </p>
      <Grid spacing={2} container>
        {data.map((item) => {
          const {
            title,
            price,
            description,
            productImages,
            categoryref,
            slug,
            trending,
          } = item.fields;
          return trending ? (
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
          ) : null;
        })}
      </Grid>
    </section>
  );
}
