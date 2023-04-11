import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/appBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
    </main>
  )
}
