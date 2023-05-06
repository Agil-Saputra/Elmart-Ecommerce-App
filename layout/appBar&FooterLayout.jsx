import React from 'react'
import Navbar from '@/components/header/appBar'
import Footer from '@/components/footer/footer'
import ScrollTopButton from '@/components/ui/scrollTopButton'


const appBarFooterLayout = ({children, data}) => {
  return (
    <>
        <Navbar data={data}/>
        {children}
        <p>{data}</p>
        <ScrollTopButton/>
        <Footer/>
    </>
  )
}

export default appBarFooterLayout