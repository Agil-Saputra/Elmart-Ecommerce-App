import React from "react";
import { Button, Divider, } from "@mui/material";
import { client, contentfulClient } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import Image from "next/image";
import Slider from "react-slick";
import BackToHomeButton from "@/components/ui/backToHomeButton";

export async function getStaticPaths() {
  const product = await contentfulClient("product");
  const paths = product.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "product",
    "fields.slug": params.slug,
  });
  Response = safeJsonStringify(items);
  const data = JSON.parse(Response);

  const relateProducts = await client.getEntries({
    content_type: "product",
    "fields.selected": data[0].fields.selected,
  });
  const relateProductsResponse = safeJsonStringify(relateProducts);
  const relateProductsData = JSON.parse(relateProductsResponse);

  return {
    props: {
      product: data[0],
      relateProducts : relateProductsData,
    },
  };
}


const product = ({ product, relateProducts }) => {
  const { title, description, price, productImages, variants } = product.fields;

  console.log(relateProducts);


  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={'https:' + productImages[i].fields.file.url} className="h-full w-full"/>
        </a>
      );
    },
    dots: true,
    dotsClass : "img-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className : 'xmd:max-w-[500px] w-full'
  };

  return (
    <>
      <main className="margin-top-global main-margin mb-16">

      <BackToHomeButton/>
        <div className="flex max-xlg:flex-col justify-between gap-8">
          <div className="flex gap-8 max-xmd:flex-col">
            {/* <SliderProductImage images={productImages} /> */}
            <Slider {...settings}>
              {productImages.map((item, i) => (
              <Image
              key={i}
              src={'https:' + item.fields.file.url}
              alt='banner image'
              width={400}
              height={400}
              className='h-[400px] rounded-[5px] object-cover'
              /> ))} 
            </Slider>

            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="max-w-[45ch] text-justify">{description}</p>
              <p className="text-[2.7rem]">${price}</p>
              <div className="mt-6">
              <p className="text-xl font-medium ">Available Variants</p>
                {variants.map((item, i) => (
                  <Button key={i}>{item}</Button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[300px] p-[3rem] bg-red-300">
            <p className="text-xl font-bold">Checkout</p>
          
          </div>




        </div>
      </main>
      <Divider variant="fullWidth" className="mb-6 divide-dashed" />
    </>
  );
};

export default product;
