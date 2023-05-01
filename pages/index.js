import Navbar from "@/components/header/appBar";
import Carousel from "@/components/sections/carousel";
import Trending from "@/components/sections/trending";
import Banner from "@/components/sections/banner";
import Categories from "@/components/sections/categories";
import SelectedProducts from "@/components/sections/selectedProducts";
import BrandStand from "@/components/sections/brandStand";
import Footer from "@/components/footer/footer";
import contentfulClient from "../cms/contentful";


export async function getStaticProps() {

const productData = await contentfulClient("product")
const brandData = await contentfulClient("brand")
const categoryData = await contentfulClient("category")

 return {
  props : {
    products : productData.items,
    brands : brandData.items,
    categories : categoryData.items,
  }
 }
}
export default function Home({ products, brands, categories }) {
  return (
    <>
      <Navbar />
      <Carousel />
      <Trending data={products}/>
      <Banner />
      <Categories data={categories}/>
      <SelectedProducts data={products}/>
      <BrandStand data={brands} />
      <Footer />
    </>
  );
}
