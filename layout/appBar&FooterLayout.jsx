import React from 'react'
import Navbar from '@/components/header/appBar'
import Footer from '@/components/footer/footer'
import ScrollTopButton from '@/components/ui/scrollTopButton'


const appBarFooterLayout = ({children, category, products}) => {
  return (
    <>
        <Navbar category={category} products={products}/>
        {children}
        <ScrollTopButton/>
        <Footer/>
    </>
  )
}

export default appBarFooterLayout