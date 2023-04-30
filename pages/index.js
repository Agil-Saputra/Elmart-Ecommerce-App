import Navbar from '@/components/header/appBar'
import Carousel from '@/components/section/carousel'
import Trending from '@/components/section/trending'
import Banner from '@/components/section/banner'
import Categories from '@/components/section/categories'
import SelectedPeroducts from '@/components/section/selectedProducts'
import BrandStand from '@/components/section/brandStand'
import Footer from "@/components/footer/footer"

export default function Home() {
  return (
    <>
    <Navbar/>
      <Carousel/>
      <Trending/>
      <Banner/>
      <Categories/>
      <SelectedPeroducts/>
      <BrandStand/>
    <Footer/>
    </>
 
  )
}
