import React, { useState } from "react";
import Image from "next/image";
import { contentfulClient, client } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import ProductCard from "@/components/card/productCard";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortSelect from "@/components/ui/select/sortSelect";
import Head from "next/head";
import useSortByCriteria from "@/hooks/useSortByCriteria";
import SomethingWrong from "../../assets/Something went wrong.svg";

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

const Categories = ({ category }) => {
  const [query, setQuery] = useState("");
  const [sortName, setSortName] = useState("");
  const { categoryBanner, product, title } = category.fields;

  // get filtered products based on user input
  function filtered(arr) {
    return arr.filter(
      ({ fields: { title, description } }) =>
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query.toLowerCase())
    );
  }

  const filteredProducts = filtered(product).map((item) => item.fields);
  const sortedProducts = useSortByCriteria(filteredProducts, sortName);

  return (
    <>
      <Head>
        <title>{title} | Elmart E-commerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Image
        priority
        src={"https:" + categoryBanner.fields.file.url}
        alt={categoryBanner.fields.title}
        width={categoryBanner.fields.file.details.image.width}
        height={categoryBanner.fields.file.details.image.height}
        className="w-full object-fill mt-[4rem] sticky top-0"
      />

      <main className="main-margin md:translate-y-[-3rem] translate-y-[-0.8rem] bg-white shadow-lg border-2 rounded-[5px]">
        <div className="p-[10px]">
          <div className="flex gap-4 justify-between items-start">
            <TextField
              className="w-2/6 max-md:w-full mb-3"
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                size: "small",
                placeholder: "Search this category...",

                startAdornment: (
                  <InputAdornment position="start" className="mr-1 ml-1">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <SortSelect sortName={sortName} setSortName={setSortName} />
            </div>
          </div>

          {sortedProducts[0] ? (
            <div
              className={
                (product.length > 3 ? "md:grid-cols-4" : "md:grid-cols-3") +
                " gap-3 grid sm:grid-cols-2 grid-cols-1 "
              }
            >
              {sortedProducts.map(
                ({ title, price, description, productImages, slug }) => {
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
                }
              )}
            </div>
          ) : (
            <div className="grid place-items-center w-full text-center">
                <Image
                  src={SomethingWrong}
                  width={500}
                  height={500}
                  priority
                  alt="Something Wrong ilustration"
                />
                <p className="md:text-xl font-medium mt-4 text-red-400">
                  <span className="font-bold md:text-[25px]">
                    Something Wrong!{" "}
                  </span>
                  <br />
                  We couldn't find your product,
                  <br /> please try another keyword
                </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Categories;

