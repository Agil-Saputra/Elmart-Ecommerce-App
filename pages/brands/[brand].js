import React from "react";
import { contentfulClient, client } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import ProductCard from "@/components/card/productCard";
import Head from "next/head";
import Image from "next/image";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

export async function getStaticPaths() {
  const brands = await contentfulClient("brand");
  const paths = brands.items.map((item) => {
    return {
      params: { brand: item.fields.slug },
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

const Brand = ({ brand }) => {
  const {
    title,
    desc,
    brandLogo: { fields },
    products,
    slug,
  } = brand.fields;
  console.log(products);

  return (
    <>
      <Head>
        <title>{title} | Elmart E-commerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex main-margin margin-top-global gap-4 max-md:flex-col min-h-[80vh]">
        <div className="min-w-[200px] border-2 p-2 rounded-md grid  gap-1  md:sticky top-14 h-fit ">
          <Breadcrumbs
          sx={{
            mb: 2,
            "& .MuiBreadcrumbs-li": {
              "&:hover, &:focus": {
                color: "primary.main",
              },
            },
          }}
          >
            <Link href="/">Home</Link>
            <Link href="/">brands</Link>
            <Link href={`/brands/${slug}`} className="lowercase">{title}</Link>
          </Breadcrumbs>
          <Image
            src={"https:" + fields.file.url}
            width={100}
            height={100}
            priority
            className="object-contain rounded-md px-4 py-2 border-[1px] border-black mb-4"
          />
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-lg max-lg:text-sm">{desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-2 grid-cols-1">
          {products?.map(
            ({
              fields: {
                trending,
                slug,
                title,
                price,
                description,
                categoryref,
                productImages,
              },
            }) => (
              <ProductCard
                key={slug}
                title={title}
                slug={slug}
                price={price}
                desc={description}
                image={productImages[0].fields.file.url}
                trending={trending}
              />
            )
          )}
        </div>
      </main>
    </>
  );
};

export default Brand;
