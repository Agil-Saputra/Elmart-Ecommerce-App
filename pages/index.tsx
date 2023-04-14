
import { Inter } from 'next/font/google'
import Navbar from '@/components/appBar'
import Carousel from '@/components/carousel'
import Trending from '@/components/trending'
import Banner from '@/components/banner'
import Categories from '@/components/categories'
import SelectedPeroducts from '@/components/selectedProducts'
import EmailForm from '@/components/form'
import BannerMansonry from '@/components/bannerMansory'
import BrandStand from '@/components/brandStand'

const inter = Inter({ subsets: ['latin'] })

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
      <BannerMansonry/>
    </main>
    <BrandStand />
    <footer>
      <EmailForm/>
    </footer>
    </>
  )
}
