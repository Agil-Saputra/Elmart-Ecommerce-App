import CategoryCard from "../card/categoryCard";
import { Grid } from "@mui/material";

export default function FeaturedCategories() {
  const itemProps = {
    item: true,
    xs: 12,
    sm: 3,
    md: 2.4,
  };

  return (
      <section className="bg-white shadow-lg rounded-xl main-margin md:translate-y-[-3.3rem]">
        <p className="text-2xl md:text-3xl p-4 font-bold mb-3 md:mb-6 sticky">
          All Categories
        </p>
          <Grid container spacing={2}>
            <Grid {...itemProps}>
              <CategoryCard />
            </Grid>
            <Grid {...itemProps}>
              <CategoryCard />
            </Grid>
            <Grid {...itemProps}>
              <CategoryCard />
            </Grid>
            <Grid {...itemProps}>
              <CategoryCard />
            </Grid>
            <Grid {...itemProps}>
              <CategoryCard />
            </Grid>
          </Grid>
      </section>

  );
}
