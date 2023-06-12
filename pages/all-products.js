import { useState } from "react";
import { contentfulClient } from "@/cms/contentful";
import ProductCard from "@/components/card/productCard";
import { State } from "@/context/Provider";
import SomethingWrong from "../assets/Something went wrong.svg";
import Image from "next/image";
import styled from "@emotion/styled";
import { Slider, Divider, Button, Drawer} from "@mui/material";
import useSortByCriteria from "@/hooks/useSortByCriteria";
import SortSelect from "@/components/ui/select/sortSelect";
import ToggleButtonComp from "@/components/ui/toggleButton";
import { Apple, Category,Tune } from "@mui/icons-material";
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
  const [priceValue, setPriceValue] = useState([0, 5000]);
  const [sortName, setSortName] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        (fields.price >= priceValue[0] && fields.price <= priceValue[1]) || ""
    )
    .map(({ fields }) => fields);

  const sorted = useSortByCriteria(filteredProductsByPrice, sortName);

  function filterByCriteria(data) {
    return data.filter(({ categoryref, brand }) => {
      const categoryTitle = categoryref[0].fields.title;
      const brandTitle = brand[0].fields.title;
      if (categoryName == null && brandName == null) {
        return true;
      }  
      if (brandName && categoryName) {
        return categoryTitle == categoryName && brandTitle == brandName;
      } 
       if (brandName) {
        return brandTitle == brandName;
      } 
      if (categoryName) {
        return categoryTitle == categoryName;
      }
    });
  }

  const finalProducts = filterByCriteria(sorted); // save filtered, and searched products on one variable

  const FilterComponent = (
    <div className="rounded-[5px] h-fit min-w-[300px] sticky top-10 p-3 border-2 overflow-scroll">
      <h1 className="font-bold text-2xl mb-3 mt-2 flex items-center gap-1 justify-between">
        Shop By
        <Tune />
      </h1>
      <Divider fullWidth />
      <div>
        <p className="text-lg font-medium">Price $</p>
        <PrettoSlider
          value={priceValue}
          min={0}
          max={5000}
          marks={[
            { value: priceValue[0], label: `${priceValue[0]}$` },
            { value: priceValue[1], label: `${priceValue[1]}$` },
          ]}
          onChange={(e, value) => setPriceValue(value)}
          valueLabelFormat={(value) => `${value}$`}
        />
        <p className="font-bold flex items-center">
          Categories
          <Category fontSize="small" />
        </p>
        <Divider className="h-[4px]" />
        <ToggleButtonComp
          data={category}
          criteria={categoryName}
          setCriteria={setCategoryName}
        />
        <p className="font-bold flex items-center">
          Brands
          <Apple fontSize="small" />
        </p>
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
              setPriceValue([0, 5000]);
            }}
          >
            Reset Filter
          </Button>
        ) : null}
      </div>
    </div>
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="margin-top-global main-margin flex gap-4">

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        className="hidden max-[800px]:block p-1"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
         
          "& .MuiDrawer-paper": { boxSizing: "border-box", },
        }}
      >
        {FilterComponent}
      </Drawer>

     
       <div className="block max-[800px]:hidden">{FilterComponent}</div>

      <div
        className={!finalProducts[0] ? "w-full" : "w-fit" }
      >
        {finalProducts[0] ? (
          <>
            <div className="flex w-full items-start justify-end max-[800px]:justify-between">
           <div onClick={handleDrawerToggle} className="max-[800px]:block hidden hover:bg-slate-100 p-1 rounded-[100px]">
               <Tune />
           </div>
            
              <div className="mb-3">
                <SortSelect sortName={sortName} setSortName={setSortName} />
              </div>
    
            </div>
            <div className="gap-2 grid max-[455px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 mlg:grid-cols-4 min-h-[90vh] w-full">
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
