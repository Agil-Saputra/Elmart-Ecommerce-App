import React, { useState } from "react";
import Image from "next/image";
import { contentfulClient, client } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import ProductCard from "@/components/card/productCard";
import { TextField, InputAdornment, Slider, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import styled from "@emotion/styled";

// create a custom MUI Slider for price range slider
const PrettoSlider = styled(Slider)({
  width: "100%",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 15,
    width: 22,
    height: 22,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#39C6A5",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export async function getStaticPaths() {
  const product = await contentfulClient("category");
  const paths = product.items.map((item) => {
    return {
      params: { category: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "category",
    "fields.slug": params.category,
  });
  Response = safeJsonStringify(items);
  const data = JSON.parse(Response);

  return {
    props: {
      category: data[0],
    },
  };
}

const Categories = ({ category }) => {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState([2000, 3000]);
  const { categoryBanner, product } = category.fields;

  // get filtered products based on user input
  function filtered(arr) {
    return arr.filter(
      (item) =>
        item.fields.title.toLowerCase().includes(query) ||
        item.fields.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  const filteredProducts = filtered(product);

  // get price range value from price slider 
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <>
      <Image
        priority
        src={"https:" + categoryBanner.fields.file.url}
        alt={categoryBanner.fields.title}
        width={categoryBanner.fields.file.details.image.width}
        height={categoryBanner.fields.file.details.image.height}
        className="w-full object-fill mt-[4rem]"
      />

      <main className="main-margin md:translate-y-[-3rem] translate-y-[-0.8rem] bg-white shadow-lg border-2 rounded-[5px]">
        <div className="p-[10px]">
          <p className="text-[22px] font-semibold uppercase mb-4 text-primary flex items-center gap-1">
            Products on This Category
            <CategoryIcon />
          </p>
          <div className="justify-between flex max-md:flex-col">
            <TextField
              className="w-2/6 max-md:w-full mb-3"
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                size: "small",
                placeholder: "Search this category...",
                
                startAdornment: (
                  <InputAdornment position="start" className="mr-1 ml-1">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={2} alignItems="center" className="w-[40%] max-md:w-[60%]">
              <Grid item>
                <p className="pb-[30px]">Price</p>
              </Grid>
              <Grid item xs>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  defaultValue={value}
                  min={0}
                  max={5000}
                  marks={[{ value: 0, label: "0$" }, { value: 5000, label: "5000$" },]}
                  step={500}
                  onChange={handleChange}
                  valueLabelFormat={(value) => `${value}$`}
                />
              </Grid>
            </Grid>
          </div>

          <div
            className={
              (product.length > 2 ? "grid-cols-3" : "grid-cols-2") +
              " gap-3 grid max-md:grid-cols-1"
            }
          >
            {filteredProducts.map((item) => {
              const { title, price, description, productImages, slug } =
                item.fields;
              return (
                <ProductCard
                  title={title}
                  price={price}
                  desc={description}
                  image={productImages[0].fields.file.url}
                  slug={slug}
                  key={title}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Categories;
