import React, { useState } from "react";
import { contentfulClient } from "@/cms/contentful";
import ProductCard from "@/components/card/productCard";
import { cartState } from "@/context/Provider";

export async function getStaticProps() {
  const data = await contentfulClient("product");
  return {
    props: {
      products: data.items,
    },
  };
}

const AllProducts = ({ products }) => {
  const {
    state: { searchQuery },
  } = cartState();
  function filtered(arr) {
    return arr.filter(
      (item) =>
        item.fields.title.toLowerCase().includes(searchQuery) ||
        item.fields.description.toLowerCase().includes(searchQuery)
    );
  }

  const filteredProducts = filtered(products);
  return (
    <div className="margin-top-global main-margin">
      {filteredProducts[0]
       ? ( <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((item, i) => {
            const {
              title,
              slug,
              price,
              categoryref,
              description,
              productImages,
            } = item.fields;
            return (
              <ProductCard
                title={title}
                slug={slug}
                price={price}
                desc={description}
                category={categoryref[0].fields.title}
                image={productImages[0].fields.file.url}
                key={i}
              />
            );
          })}
        </div>
      ) : (
        <div>sorry we couldnt find your product, try another keyword</div>
      )}
    </div>
  );
};

export default AllProducts;