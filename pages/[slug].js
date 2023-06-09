import React, { useState } from "react";
import {
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Button,
  Typography,
  NoSsr,
  Avatar,
  Breadcrumbs,
} from "@mui/material";
import { client, contentfulClient } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import Image from "next/image";
import Slider from "react-slick";
import BackToHomeButton from "@/components/ui/buttons/backToHomeButton";
import AddToCartButton from "@/components/ui/buttons/addToCartButton";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/card/productCard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SellIcon from "@mui/icons-material/Sell";

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
  });
  const relateProductsResponse = safeJsonStringify(relateProducts);
  const relateProductsData = JSON.parse(relateProductsResponse);

  return {
    props: {
      product: data[0],
      relateProducts: relateProductsData,
    },
  };
}

const Product = ({ product, relateProducts: { items } }) => {
  const [variantError, setVariantError] = useState(false);
  // destructure all value needed from product data
  const {
    title,
    description,
    price,
    productImages,
    variants,
    brand,
    categoryref,
    slug,
  } = product.fields;
  const category = categoryref[0].fields;
  const brands = brand[0].fields;
  const [variantValue, setVariantValue] = useState(variants[0]);

  //  settings for slider
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Image
            src={"https:" + productImages[i]?.fields.file.url}
            width={100}
            height={100}
            className="h-full w-auto rounded-[5px] border-[1px] shadow-lg"
            alt={productImages[i]?.fields.title}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "img-dots",
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "xmd:max-w-[500px] w-full",
  };

  // setting count to adjust the quantity of product
  const [count, setCount] = useState(1);
  function handleIncrement() {
    setCount(count + 1);
  }
  function handleDecrement() {
    setCount(count - 1);
  }
  // avoid user to have 0 product quantity
  const displayCounter = count > 1;

  const relateItems = items
    .filter(
      ({ fields }) =>
      // filter products by category and brand to create relate products
        fields.categoryref[0].fields.title == categoryref[0].fields.title ||
        fields.brand[0].fields.title == brands.title
    )
    // remove inital product from array
    .filter(({ fields }) => fields.title !== title);

  // console.log(relateItems.filter(item => ))

  return (
    <>
      <Head>
        <title>{title} | Elmart E-commerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="margin-top-global main-margin mb-16">
        <BackToHomeButton />
        <Breadcrumbs
          sx={{
            mb: 1,
            "& .MuiBreadcrumbs-li": {
              "&:hover, &:focus": {
                color: "primary.main",
              },
            },
          }}
        >
          <Link href={"/"}>Home</Link>
          <Link href={`/categories/${category.slug}`}>{category.title}</Link>
          <Link href={`/${slug}`}>{title}</Link>
        </Breadcrumbs>
        <div className="flex max-xlg:flex-col justify-between gap-8">
          <div className="flex gap-8 max-xmd:flex-col">
            <Slider {...settings}>
              {productImages.map((item, i) => (
                <Image
                  key={i}
                  priority
                  src={"https:" + item.fields.file.url}
                  alt="banner image"
                  width={400}
                  height={400}
                  className="md:h-[400px] max-ms:h-[250px] h-[350px] rounded-[5px] object-cover border-[1px]"
                />
              ))}
            </Slider>

            <div>
              <Typography className="md:text-[2.3rem] text-[1.5rem] font-bold capitalize leading-0 ">
                {title}
              </Typography>
              <Divider />
              <p className="md:max-w-[45ch] text-justify">{description}</p>
              <div className="flex max-sm:flex-col gap-3 mt-2">
                <Link href={"/categories/" + category.slug}>
                  <div className="group flex gap-3 items-center border-2 w-fit p-1 rounded-[5px] hover:text-primary smooth-transition">
                    <Avatar
                      alt="category image"
                      variant="rounded"
                      className="group-hover:rotate-3"
                      src={"https:" + category.categoryImage.fields.file.url}
                    />
                    <p>{category.title}</p>
                  </div>
                </Link>

                <Link href={"/brands/" + brands.slug}>
                  <div className="flex gap-3 group items-center border-2 w-fit p-1 hover:text-primary  rounded-[5px] smooth-transition">
                    <Avatar
                      alt="brand image"
                      variant="rounded"
                      className="group-hover:rotate-3"
                      sx={{
                        border: "solid 1px grey",
                        "& .MuiAvatar-img": {
                          objectFit: "contain",
                          p: 1,
                        },
                      }}
                      src={"https:" + brands.brandLogo.fields.file.url}
                    />
                    <p>{brands.title}</p>
                  </div>
                </Link>
              </div>
              <p className="md:text-[2.7rem] text-[2rem]">
                ${price}
                <SellIcon />
              </p>
              <div className="mt-3">
                <p className="text-xl font-medium mb-4">Available Variants :</p>
                <ToggleButtonGroup
                  color="primary"
                  value={variantValue}
                  exclusive
                  onChange={(e, value) => {
                    setVariantValue(value);
                    if (value == null) {
                      setVariantError(true);
                    } else {
                      setVariantError(false);
                    }
                  }}
                  className="grid grid-cols-2 gap-2"
                  sx={{
                    "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                      borderRadius: "5px",
                      borderColor: "primary.main",
                    },
                    "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
                      borderRadius: "5px",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  {variants.map((item, i) => (
                    <ToggleButton key={i} value={item} className="shadow-md">
                      {item}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            </div>
          </div>

          <NoSsr>
            <div
              className={
                "sm:sticky top-5 border-2 shadow-md rounded-[5px] p-2 xlg:w-[20%] w-full h-fit"
              }
            >
              <p className="text-xl font-bold">
                <LocalMallIcon className="mr-1" />
                Checkout
              </p>
              <div className="flex justify-between gap-4 items-center my-2">
                <p className="font-bold text-[14px]">Amount:{count}</p>

                <ButtonGroup size="small">
                  <Button onClick={handleIncrement}>+</Button>
                  <Button disabled>{count}</Button>
                  <Button
                    onClick={handleDecrement}
                    disabled={displayCounter ? false : true}
                  >
                    -
                  </Button>
                </ButtonGroup>
              </div>
              <Divider />

              <p className="p-1 border-[1.5px] flex justify-between gap-2 items-center my-4 rounded-[5px]">
                <span className="font-bold text-[14px]">Total:</span>
                <span className="font-bold">${price * count}</span>
              </p>

              <AddToCartButton
                data={product.fields}
                amount={count}
                variant={variantValue}
                variantError={variantError}
              />
            </div>
          </NoSsr>
        </div>
      </main>
      <Divider variant="fullWidth" className="mb-2 divide-dashed" />
      <p className="font-bold text-[2rem] main-padding">
        Related Products Might You like
      </p>
      <Divider variant="fullWidth" className="my-2 divide-dashed" />
      <div className="main-margin">
        <div className="grid grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1">
          {relateItems.map(
            ({
              fields: {
                title,
                productImages,
                slug,
                description,
                categoryref,
                price,
                trending,
              },
            }) => (
              <ProductCard
                key={slug}
                title={title}
                price={price}
                desc={description}
                image={productImages[0].fields.file.url}
                category={categoryref[0].fields.title}
                slug={slug}
                trending={trending}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
