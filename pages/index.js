import Carousel from "@/components/sections/carousel";
import Trending from "@/components/sections/trending";
import Banner from "@/components/sections/banner";
import Categories from "@/components/sections/categories";
import SelectedProducts from "@/components/sections/selectedProducts";
import BrandStand from "@/components/sections/brandStand";
import {contentfulClient} from "../cms/contentful";
import AppBarFooterLayout from "@/layout/appBar&FooterLayout";

export async function getStaticProps() {

const productData = await contentfulClient("product")
const brandData = await contentfulClient("brand")
const categoryData = await contentfulClient("category")
const bannerImages = await contentfulClient("banner")

 return {
  props : {
    products : productData.items,
    brands : brandData.items,
    categories : categoryData.items,
    banner : bannerImages.items
  }
 }
}
export default function Home({ products, brands, categories, banner }) {
  return (
    <AppBarFooterLayout>
      <Carousel data={banner}/>
      <Trending data={products}/>
      <Banner data={banner}/>
      <Categories data={categories}/>
      <SelectedProducts data={products}/>
      <BrandStand data={brands} />
    </AppBarFooterLayout>
  );
}
