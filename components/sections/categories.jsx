import CategoryCard from "../card/categoryCard";
import { Grid } from "@mui/material";

export default function FeaturedCategories({data}) {
  return (
      <section className="bg-white shadow-md rounded-md main-margin md:translate-y-[-3.3rem] ">
        <p className="text-2xl md:text-3xl  font-bold mb-3 md:mb-6 sticky">
          All Categories
        </p>
          <Grid container spacing={2} >
           {data.map(item => {
            const {title, categoryImage} = item.fields
            return (
            <Grid item xs={12} sm={3} md={2.4} key={title}>
              <CategoryCard title={title} image={categoryImage.fields.file.url}/>
            </Grid>
            )
           })}
          </Grid>
      </section>

  );
}
