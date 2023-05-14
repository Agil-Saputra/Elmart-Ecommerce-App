import React from "react";
import { NoSsr, Divider, Button, ButtonGroup } from "@mui/material";
import { cartState } from "@/context/cartProvider";
import Image from "next/image";
import RemoveFromCartButton from "@/components/ui/removeFromCartButton";
import Link from "next/link";
import emptycart from "../assets/emptyCart.svg";

const MyCart = () => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  const TotalQuantity = cart.reduce((a, b) => a + +(+b.quantity), 0);
  const TotalPrice = cart.reduce((a, b) => a + +(+b.price) * b.quantity, 0);

  return (
    <NoSsr>
      {cart[0] ? (
        <div className="margin-top-global main-margin flex gap-4">
          <div className="border-2 p-2 rounded-[5px]">
          <h2 className="text-xl font-bold">Information Order</h2>
          </div>

          <div>
        
            <div className="border-2 rounded-[5px] grid gap-2 p-2">
            <h2 className="text-xl font-bold">Cart Summary</h2>
              {cart.map((item, i) => {
                const {
                  title,
                  slug,
                  price,
                  quantity,
                  choosedVariant,
                  productImages,
                } = item;
                return (
                  <div
                    key={i}
                    className="flex max-[446px]:flex-col justify-between items-start gap-4 hover:text-primary smooth-transition"
                  >
                    <Link href={"/" + slug}>
                      <div className="min-w-[150px] max-[446px]:w-full overflow-hidden rounded-[5px]">
                        <Image
                          src={"https:" + productImages[0].fields.file.url}
                          alt={productImages[0].fields.title}
                          width={100}
                          height={100}
                          priority
                          className="hover:scale-105 min-w-[150px] max-[446px]:w-full rounded-[5px] max-md:h-[150px] h-[100px] object-cover"
                        />
                      </div>
                    </Link>
                    <Link href={"/" + slug} className="w-full text-justify">
                      <p>{title}</p>
                      <p>${price * quantity}</p>
                      <p className="uppercase">{choosedVariant}</p>
                    </Link>

                    <div>
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button
                          onClick={() => {
                            dispatch({
                              type: "SET_INCREMENT",
                              payload: {
                                slug: slug,
                                variant: choosedVariant,
                              },
                            });
                          }}
                        >
                          +
                        </Button>
                        <Button disabled>{quantity}</Button>
                        <Button
                          onClick={() => {
                            dispatch({
                              type: "SET_DECREMENT",
                              payload: {
                                slug: slug,
                                variant: choosedVariant,
                              },
                            });
                          }}
                          disabled={quantity == 1 ? true : false}
                        >
                          -
                        </Button>
                      </ButtonGroup>
                    </div>
                    <RemoveFromCartButton
                      slug={slug}
                      variant={choosedVariant}
                    />
                    <Divider />
                  </div>
                );
              })}
            </div>

            <div className="border-2 rounded-[5px] grid gap-2 p-2 mt-4 font-semibold">
            <h2 className="text-xl font-bold">Order Summary</h2>
             <div className="flex justify-between gap-8 items-center">
               <p>Total Product : <span>{TotalQuantity}</span></p>
               <p>Subtotal : <span className="underline underline-offset-4 font-bold text-lg ">${TotalPrice}</span></p>
             </div>

              <Button
                fullWidth
                variant="contained"
                className="bg-primary shadow-md text-white"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center margin-top-global main-margin ">
          <Image
            src={emptycart}
            width={300}
            height={300}
            priority
            alt="empty cart ilustration"
          />
          <p className="text-black font-bold text-lg md:text-2xl">
            Oops, your shopping cart is empty!
          </p>
          <p className="text-black text-left md:text-lg text-md">
            Come on, fill it with your dream items!
          </p>
         <Link href="/">
           <Button variant="contained" className="bg-primary text-white capitalize my-2">
             start shopping
           </Button>
         </Link>
          </div>
      )}
    </NoSsr>
  );
};

export default MyCart;
