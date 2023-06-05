import Carousel from "@/components/sections/carousel";
import Trending from "@/components/sections/trending";
import Banner from "@/components/sections/banner";
import Categories from "@/components/sections/categories";
import SelectedProducts from "@/components/sections/selectedProducts";
import BrandStand from "@/components/sections/brandStand";
import { contentfulClient } from "../cms/contentful";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { State } from "@/context/Provider";
import { CircularProgress } from "@mui/material";

export async function getStaticProps() {
  const productData = await contentfulClient("product");
  const brandData = await contentfulClient("brand");
  const categoryData = await contentfulClient("category");
  const bannerImages = await contentfulClient("banner");

  return {
    props: {
      products: productData.items,
      brands: brandData.items,
      categories: categoryData.items,
      banner: bannerImages.items,
    },
  };
}

export default function Home({ products, brands, categories, banner }) {
  const [load, setLoad] = useState(false);
  const { state, dispatch } = State();
  const router = useRouter();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      router.replace(`/success`);
      dispatch({
        type: "REMOVE_ALL",
      });
      setLoad(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!load ? (
        <>
          <Carousel data={banner} />
          <Trending data={products} />
          <Banner data={banner} />
          <Categories data={categories} />
          <SelectedProducts data={products} />
          <BrandStand data={brands} />
        </>
      ) : (
        <div className="margin-top-global main-margin h-[80vh] grid place-items-center">
          <div className="text-center">
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                color: "primary.main",
                animationDuration: "440ms",
                mb: 1,
              }}
              size={60}
              thickness={4}
            />
            <p>Redirecting To Succes Page...</p>
          </div>
        </div>
      )}
    </>
  );
}
