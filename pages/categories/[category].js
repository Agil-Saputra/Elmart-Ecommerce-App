import React from "react";
import Image from "next/image";
import { contentfulClient, client } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import AppBarFooterLayout from "@/layout/appBar&FooterLayout";
import ProductCard from "@/components/card/productCard";

export async function getStaticPaths() {
  const product = await contentfulClient("category");
  const paths = product.items.map((item) => {
    return {
      params: { category: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "category",
    "fields.slug": params.category,
  });
  Response = safeJsonStringify(items);
  const data = JSON.parse(Response);

  return {
    props: {
      category: data[0],
    },
  };
}

const categories = ({ category }) => {
  console.log(category);
  const { categoryBanner, product } = category.fields;
  return (
    <AppBarFooterLayout>
      <Image
        priority
        src={"https:" + categoryBanner.fields.file.url}
        alt={categoryBanner.fields.title}
        width={categoryBanner.fields.file.details.image.width}
        height={categoryBanner.fields.file.details.image.height}
        className="w-full object-fill mt-[4rem]"
      />

      <main className="main-margin md:translate-y-[-3rem] translate-y-[-0.8rem] bg-blue-300">
        <div className="">
          <p>Product on This Categories</p>
          <div>
            {product.map((item) => {
              const { title, price, description, productImages, slug } =
                item.fields;
              return (
                <ProductCard
                  title={title}
                  price={price}
                  desc={description}
                  image={productImages[0].fields.file.url}
                  slug={slug}
                  key={title}
                />
              );
            })}
          </div>
        </div>
      </main>
    </AppBarFooterLayout>
  );
};

export default categories;
