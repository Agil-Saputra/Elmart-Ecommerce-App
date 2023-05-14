import React, { useState } from "react";
import {
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Button,
  Typography,
  NoSsr,
} from "@mui/material";
import { client, contentfulClient } from "@/cms/contentful";
import safeJsonStringify from "safe-json-stringify";
import Image from "next/image";
import Slider from "react-slick";
import BackToHomeButton from "@/components/ui/backToHomeButton";
import AddToCartButton from "@/components/ui/addToCartButton";
import { cartState } from "@/context/cartProvider";

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
      relateProducts: relateProductsData,
    },
  };
}

const Product = ({ product, relateProducts }) => {
  const { title, description, price, productImages, variants, slug } =
    product.fields;
  const [variantValue, setVariantValue] = useState(variants[0]);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={"https:" + productImages[i].fields.file.url}
            className="h-full w-auto rounded-[5px]"
            alt={productImages[i].fields.title}
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

  const {
    state: { cart },
  } = cartState();
  const checkAdded = cart.some((p) => p.slug == slug);

  const [count, setCount] = useState(1);

  function handleIncrement() {
    setCount(count + 1);
  }
  function handleDecrement() {
    setCount(count - 1);
  }

  const displayCounter = count > 1;

  return (
    <>
      <main className="margin-top-global main-margin mb-16">
        <BackToHomeButton />
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
                  className="md:h-[400px] max-ms:h-[250px] h-[350px] rounded-[5px] object-cover "
                />
              ))}
            </Slider>

            <div>
              <Typography className="md:text-[2.3rem] text-[1.5rem] font-bold capitalize leading-0 ">
                {title}
              </Typography>
              <Divider />
              <p className="md:max-w-[45ch] text-justify">{description}</p>
              <p className="md:text-[2.7rem] text-[2rem]">${price}</p>
              <div className="mt-3">
                <p className="text-xl font-medium mb-4">Available Variants :</p>
                <ToggleButtonGroup
                  color="primary"
                  value={variantValue}
                  exclusive
                  onChange={(e, value) => {
                      setVariantValue(value);
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
            {/* (checkAdded ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100" ) +   */}
            <div
              className={
                " border-2 shadow-md rounded-[5px] p-2 xlg:w-[20%] w-full h-fit"
              }
            >
              <p className="text-xl font-bold">Checkout</p>
              <div className="flex justify-between gap-4 items-center my-2">
                <p className="font-bold text-[14px]">Amount:{count}</p>

                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
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
                // added={checkAdded}
              />
            </div>
          </NoSsr>
        </div>
      </main>
      <Divider variant="fullWidth" className="mb-6 divide-dashed" />
    </>
  );
};

export default Product;
