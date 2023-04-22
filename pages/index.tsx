import Navbar from '@/components/appBar'
import Carousel from '@/components/carousel'
import Trending from '@/components/trending'
import Banner from '@/components/banner'
import Categories from '@/components/categories'
import SelectedPeroducts from '@/components/selectedProducts'
import BrandStand from '@/components/brandStand'
import Footer from "@/components/footer/footer"

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen px-2 sm:px-10 lg:px-20">
      <Carousel />
      <Trending/>
      <Banner/>
      <Categories/>
      <SelectedPeroducts/>
    </main>
    <BrandStand />
    <Footer/>
    </>
 
  )
}
