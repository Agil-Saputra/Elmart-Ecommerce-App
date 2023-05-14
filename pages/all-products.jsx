import React, { useState } from 'react'
import { contentfulClient } from '@/cms/contentful';
import ProductCard from '@/components/card/productCard';


export async function getStaticProps() {

  const data = await contentfulClient("product")
  return {
    props: {
      products: data.items,
    },
  };
}

const AllProducts = ({products}) => {
  const [value, setValue] = useState("")
  function filtered (arr) {
    return arr.filter(item => item.fields.title.toLowerCase().includes(value))
  }

  const filteredProducts = filtered(products)

  return (
    <div className='margin-top-global main-margin'>
    <form>
      <input className='border-2 outline-sky-50' type="text" onChange={(e) => setValue(e.target.value)} />
    </form>
    <div className='border-2 p-2'>
    <p>filtered products</p>
      {filteredProducts.map(item => {
        const {title, slug, price, categoryref, description, productImages} = item.fields
        return (
          <ProductCard 
            title={title}
            slug={slug}
            price={price}
            desc={description}
            category={categoryref[0].fields.title}
            image={productImages[0].fields.file.url}
          />
        )
      })}
    </div>
    </div>
  )
}

export default AllProducts