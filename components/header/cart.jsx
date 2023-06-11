import React from "react";
import { IconButton, Badge, Tooltip, Avatar, Divider, NoSsr } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { State } from "@/context/Provider";
import Link from "next/link";
import Image from "next/image";
import emptycart from "../../assets/Empty Cart.svg";


const Cart = () => {
  const {
    state: { cart },
  } = State();
  const productData = cart.map((item) => item);

  return (
    <Tooltip
      PopperProps={{
        sx: {
          padding: 0,
          paddingRight: 2,
          margin: 0,
          "& .MuiTooltip-tooltip": {
            bgcolor: "#ffff",
            border: 1,
            borderColor: "primary.main",
            p: "6px",
          },
        },
      }}
      title={
        cart.length == 0 ? (
          <div className="text-center grid place-items-center">
          <Image 
            src={emptycart}
            width={100}
            height={100}
            priority
            alt="empty cart ilustration"
          />
            <p className="text-black font-bold text-lg">
              Oops, your shopping cart is empty!
            </p>
            <p className="text-black text-left">
              Instead of being idle, just fill it with interesting stuff. Have a
              look, who knows there&apos;s something you like!
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-[2.5rem] justify-between text-black text-[15px] p-[2px]">
              <p className="font-bold">Your Cart ({cart.length})</p>
              <Link href="/mycart" className="text-primary hover:underline">
                See Now
              </Link>
            </div>
            <Divider />
            {productData.map((item, i) => {
              const {
                title,
                productImages,
                price,
                choosedVariant,
                quantity,
              } = item;
              return (
                <Link
                  href="/mycart"
                  key={i}
                >
                    <div className="text-black flex justify-between gap-2 items-center py-2 hover:text-primary smooth-transition">
                      <Avatar
                        src={"https:" + productImages[0].fields.file.url}
                        alt={productImages[0].fields.title}
                      />

                      <div className=" md:text-[13px]">
                        <p className="handle-text-overflow w-[11.5ch] line-clamp-1">
                          {title}
                        </p>
                        <p className="handle-text-overflow w-[11.5ch] line-clamp-1">
                          {choosedVariant.toUpperCase()}
                        </p>
                      </div>
                      {/* handle-text-overflow line-clamp-1 w-[4ch] */}
                      <p className="text-primary font-bold text-[1rem] handle-text-overflow line-clamp-1 w-[4.8ch]">
                        ${price * quantity}
                      </p>
                      <p className="text-primary font-bold text-[1rem] ">
                      &times;{quantity}
                      </p>
                    </div>
                    <Divider />
                </Link>
              );
            })}
          </>
        )
      }
    >
     <Link href="/mycart">
         <IconButton >
         <NoSsr>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              badgeContent={cart.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#fff",
                },
              }}
            >
              <ShoppingCart className="text-black hover:text-primary smooth-transition"/>
            </Badge>
         </NoSsr>
         </IconButton>
     </Link>

    </Tooltip>
  );
};

export default Cart;
