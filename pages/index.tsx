import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/appBar'
import Carousel from '@/components/carousel'
import  ProductCard from '@/components/productCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Carousel />
      <ProductCard/>
    </main>
  )
}
