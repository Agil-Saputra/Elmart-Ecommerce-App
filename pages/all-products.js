import { useState } from "react";
import { contentfulClient } from "@/cms/contentful";
import ProductCard from "@/components/card/productCard";
import { State } from "@/context/Provider";
import SomethingWrong from "../assets/Something went wrong.svg";
import Image from "next/image";
import styled from "@emotion/styled";
import { Slider, Divider, Button } from "@mui/material";
import useSortByCriteria from "@/hooks/useSortByCriteria";
import SortSelect from "@/components/ui/select/sortSelect";
import ToggleButtonComp from "@/components/ui/toggleButton";
import {Apple, Category, FilterList, Tune} from "@mui/icons-material"
// create a custom MUI Slider for price range slider
export const PrettoSlider = styled(Slider)({
  marginLeft: "7px",
  width: "80%",
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
});
// fetch all products data from contentful
export async function getStaticProps() {
  const products = await contentfulClient("product");
  const categories = await contentfulClient("category");
  const brands = await contentfulClient("brand");
  return {
    props: {
      products: products.items,
      categories: categories.items,
      brands: brands.items,
    },
  };
}
// retrieve searchQuery value from context
const AllProducts = ({ products, categories, brands }) => {
  const [value, setValue] = useState([0, 5000]);
  const [sortName, setSortName] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const {
    state: { searchQuery },
  } = State();

  const category = categories.map(({ fields }) => fields);
  const brand = brands.map(({ fields }) => fields);
  // filter products based on user input and filter query
  function searchedProducts(arr) {
    return arr.filter(
      ({ fields: { title, description, categoryref } }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categoryref[0].fields.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }

  const filteredProductsByPrice = searchedProducts(products)
    .filter(
      ({ fields }) =>
        (fields.price >= value[0] && fields.price <= value[1]) || ""
    )
    .map(({ fields }) => fields);

  const sorted = useSortByCriteria(filteredProductsByPrice, sortName);

  function filterByCriteria(data) {
    return data.filter(({ categoryref, brand }) => {
      const categoryTitle = categoryref[0].fields.title;
      const brandTitle = brand[0].fields.title;

      if (categoryName == null && brandName == null) {
        return true;
      } else if (brandName && categoryName) {
        return categoryTitle == categoryName && brandTitle == brandName;
      } else if (brandName) {
        return brandTitle == brandName;
      } else if (categoryName) {
        return categoryTitle == categoryName;
      }
    });
  }

  const finalProducts = filterByCriteria(sorted);

  return (
    <div className="margin-top-global main-margin flex gap-4">
      <div className="rounded-[5px] h-full min-w-[300px] sticky top-10 p-3 border-2 overflow-hidden">
        <h1 className="font-bold text-2xl mb-3 mt-2 flex items-center gap-1">Shop By<Tune/></h1>
        <Divider fullWidth />
        <div>
          <p className="text-lg font-medium">Price $</p>
          <PrettoSlider
            valueLabelDisplay="off"
            value={value}
            min={0}
            max={5000}
            marks={[
              { value: value[0], label: `${value[0]}$` },
              { value: value[1], label: `${value[1]}$` },
            ]}
            onChange={(e, value) => setValue(value)}
            valueLabelFormat={(value) => `${value}$`}
          />
          <p className="font-bold flex items-center">Categories<Category fontSize="small"/></p>
          <Divider className="h-[4px]" />
          <ToggleButtonComp
            data={category}
            criteria={categoryName}
            setCriteria={setCategoryName}
          />
          <p className="font-bold flex items-center">Brands<Apple fontSize="small"/></p>
          <Divider className="h-[4px]" />
          <ToggleButtonComp
            data={brand}
            criteria={brandName}
            setCriteria={setBrandName}
          />
          <Divider className="h-[4px]" />
          {categoryName || brandName ? (
            <Button
              variant="outlined"
              color="error"
              className="mt-2 capitalize"
              onClick={() => {
                setBrandName(null);
                setCategoryName(null);
                setValue([0, 5000]);
              }}
            >
              Reset Filter
            </Button>
          ) : null}
        </div>
      </div>
      <div
        className={!finalProducts[0] ? "w-full" : "w-fit" + " flex flex-col"}
      >
        {finalProducts[0] ? (
          <>
            <div className="self-end mb-3 t">
              <SortSelect sortName={sortName} setSortName={setSortName} />
            </div>
            <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[90vh] w-full">
              {finalProducts.map(
                ({
                  slug,
                  title,
                  price,
                  description,
                  categoryref,
                  productImages,
                }) => (
                  <ProductCard
                    key={slug}
                    title={title}
                    slug={slug}
                    price={price}
                    desc={description}
                    category={categoryref[0].fields.title}
                    image={productImages[0].fields.file.url}
                  />
                )
              )}
            </div>
          </>
        ) : (
          <div className="h-[80vh] text-center grid place-items-center w-full">
            <div>
              <Image
                src={SomethingWrong}
                width={500}
                height={500}
                priority
                alt="Something Wrong ilustration"
              />
              <p className="text-xl font-medium mt-4 text-red-400">
                <span className="font-bold text-[25px]">Something Wrong! </span>
                <br />
                We couldn't find your product,
                <br /> please try another keyword
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
