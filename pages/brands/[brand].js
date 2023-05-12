import React from 'react'
import { contentfulClient, client } from '@/cms/contentful';
import safeJsonStringify from 'safe-json-stringify';

export async function getStaticPaths() {
    const brands = await contentfulClient("brand");
    const paths = brands.items.map((item) => {
      return {
        params: { brand: item.fields.slug},
      };
    });
  
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
      content_type: "brand",
      "fields.slug": params.brand,
    });
    Response = safeJsonStringify(items);
    const data = JSON.parse(Response);
  
    return {
      props: {
        brand: data[0],
      },
    };
  }
  

const brand = ({brand}) => {
    console.log(brand);
  return (
   <>
     <div>brand</div>
   </>
  )
}

export default brand