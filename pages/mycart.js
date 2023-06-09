import { useState, useEffect } from "react";
import {
  NoSsr,
  Divider,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  TextField,
  Box,
  DialogActions,
  DialogTitle,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";

import { State } from "@/context/Provider";
import Image from "next/image";
import RemoveFromCartButton from "@/components/ui/buttons/removeFromCartButton";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import emptycart from "../assets/Empty Cart.svg";
import NoAddress from "../assets/No Navigation.svg";
import { Delete, AddLocationAlt, ShoppingCartCheckoutRounded, ReceiptLong, ShoppingBag, LocalShipping } from "@mui/icons-material"
import Head from "next/head";


const MyCart = () => {
  const [countryData, setCountryData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [error, setError] = useState(false);

  const [shippingData, setShippingData] = useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({});
  // retrieve cart and address data from context and local storage
  const {
    state: { cart, address },
    dispatch,
  } = State();

  const router = useRouter();
  const apiKey = "NjVhMzdaajl2VkpPanBmYlMyWUdGalAyenNUNWdyUWt4aDNjZFFFZQ==";
  // here i'm not using custom hook to get the API data because Hook cannot call inside a fallback
  useEffect(() => {
    // make request to api to get list of countries
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      })
      .then((res) => {
        setCountryData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      // include countryName to get selected stateName based on selected country name
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${countryName}/states`,
        {
          headers: {
            "X-CSCAPI-KEY": apiKey,
          },
        }
      )
      .then((res) => {
        setStatesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countryName]);
  // get city based on selected countryName and stateName
  useEffect(() => {
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${countryName}/states/${stateName}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": apiKey,
          },
        }
      )
      .then((res) => {
        setCitiesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateName]);
  // sum all quantity and price to display it on summary section
  const TotalQuantity = cart.reduce((a, b) => a + +(+b.quantity), 0);
  const TotalPrice = cart.reduce((a, b) => a + +(+b.price) * b.quantity, 0);

  async function handleCheckout() {
    // check if shipping data doesnt have a value
    if (!shippingData?.countryName || null) {
      setError(true);
    } else {
      try {
        // if shippingData has a value, execute this checkout
        const { data } = await axios.post(
          `${window.location.origin}/api/checkout_sessions`,
          {
            items: cart,
            address: shippingData,
          }
        );
        router.push(data.url);
        setShippingData({});
      } catch (err) {
        console.log(err);
      }
    }
  }
  // state to control the popup address menu
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  return (
    <NoSsr>
     <Head>
        <title>Checkout | Elmart E-commerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {cart[0] ? (
        <div className="margin-top-global main-margin flex max-[930px]:flex-col-reverse gap-4">
          <div
            className={
              (error ? "border-red-400" : "border-slate-200") +
              " border-2 p-2 rounded-[5px] w-2/3 max-md:w-full h-fit sticky top-20"
            }
          >
            <h2 className="text-xl font-bold"><LocalShipping className="mr-1"/>Shipping Address</h2>
            {error && (
              <p className="text-red-400 font-bold">
                Please Choose your shipping Address!
              </p>
            )}
            <d className="grid place-items-center gap-2 w-full mt-3">
              {address[0] ? (
                <ToggleButtonGroup
                  color="primary"
                  value={shippingData}
                  exclusive
                  onChange={(e, value) => {
                    setShippingData(value);
                    setError(false);
                  }}
                  className="grid grid-cols-3 gap-2 w-full"
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
                  {address.map((item, i) => {
                    const {
                      countryName,
                      stateName,
                      cityName,
                      zipCode,
                      streetAddress,
                      recipientName,
                      recipientEmail,
                    } = item;
                    return (
                      <ToggleButton
                        key={i}
                        value={item}
                        className="shadow-md grid text-left border-primary max-md:text-[10px] text-md"
                      >
                        <p className="font-bold capitalize">{recipientName}</p>
                        <p className="normal-case handle-text-overflow line-clamp-1">
                          {recipientEmail}
                        </p>
                        <p className="handle-text-overflow line-clamp-1">
                          {countryName}, {stateName}, {cityName}
                        </p>
                        <p className="handle-text-overflow line-clamp-1">
                          {streetAddress}
                        </p>
                        <p>{zipCode}</p>
                        <IconButton
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_ADDRESS",
                              payload: streetAddress,
                            });
                          }}
                          className="absolute right-0 top-0 text-red-500"
                        >
                          <Delete fontSize="small"/>
                        </IconButton>
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              ) : (
                <>
                  <Image
                    src={NoAddress}
                    width={300}
                    height={300}
                    priority
                    alt="empty cart ilustration"
                  />
                  <p className="text-medium text-center">
                    Sorry there is no shipping address,
                    <br /> Please add some Addresses{" "}
                  </p>
                </>
              )}
            </d>
            <Button
              fullWidth
              className="capitalize mt-2"
              onClick={handleClickOpen}
            >
              <AddLocationAlt/>
              Add New Address
            </Button>
            <Dialog open={open} onClose={handleClose} className="p-2 max-md:p-0">
              <DialogTitle className="px-4 py-3 font-bold">
                Add New Shipping Address
              </DialogTitle>
              <Divider />
              <DialogContent>
                <form
                  className="grid gap-4 "
                  onSubmit={handleSubmit((data) => {
                    if (!errors.streetAddress) {
                      dispatch({
                        type: "ADD_ADDRESS",
                        payload: data,
                      });
                      handleClose();
                      reset();
                    }
                  })}
                  autoComplete="off"
                >
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        options={countryData}
                        disableClearable
                        autoHighlight
                        isOptionEqualToValue={(option, value) =>
                          option.name == value.name
                        }
                        onChange={(e, value) => {
                          setCountryName(value.iso2);
                          field.onChange(value.iso2);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <Image
                              loading="lazy"
                              width={20}
                              height={20}
                              src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                              alt={option.iso2}
                            />
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                            placeholder="Select Your Country"
                            error={error}
                          />
                        )}
                      />
                    )}
                    name="countryName"
                    control={control}
                    rules={{ required: true }}
                  />

                  <div className="flex gap-4 justify-between max-md:flex-col">
                    <Controller
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          disableClearable
                          options={statesData}
                          onChange={(e, value) => {
                            setStateName(value.iso2);
                            field.onChange(value.name);
                          }}
                          fullWidth
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={(option, value) =>
                            option.name == value.name
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "off",
                              }}
                              placeholder="Select Your State"
                              error={error}
                            />
                          )}
                        />
                      )}
                      name="stateName"
                      control={control}
                      rules={{ required: true }}
                    />

                    <Controller
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          disableClearable
                          options={citiesData}
                          onInputChange={(e, value) => {
                            field.onChange(value);
                          }}
                          fullWidth
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={(option, value) =>
                            option.name == value.name
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "off",
                              }}
                              placeholder="Select Your City"
                              error={error}
                            />
                          )}
                        />
                      )}
                      name="cityName"
                      control={control}
                      rules={{ required: true }}
                    />
                  </div>

                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Recipient Name"
                        fullWidth
                        error={error}
                      />
                    )}
                    name="recipientName"
                    control={control}
                    rules={{ required: true }}
                  />
                  <Controller
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Your Email"
                        fullWidth
                        type="email"
                        helperText="This Email will be your payment Email"
                        error={error}
                      />
                    )}
                    name="recipientEmail"
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      },
                    }}
                  />

                  <div className="flex gap-2 max-md:flex-col">
                    <Controller
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label="Street Address"
                          className="w-[90%] max-md:w-full"
                          error={error}
                        />
                      )}
                      name="streetAddress"
                      control={control}
                      rules={{ required: true }}
                    />
                    <Controller
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label="Zip Code"
                          className="w-2/3 max-md:w-full"
                          variant="outlined"
                          error={error}
                          type="number"
                          helperText={error && "please enter a valid zip code"}
                        />
                      )}
                      name="zipCode"
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^\d{5}(?:[-\s]\d{4})?$/g,
                        },
                      }}
                    />
                  </div>

                  <div className="flex justify-end max-[800px]:flex-col gap-4 mt-4">
                    <Button
                      className="hover:border-red-300 border-red-400 text-red-400"
                      onClick={handleClose}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="outlined">
                      Add New Address
                    </Button>
                  </div>
                </form>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
          <div>
            <div className="border-2 rounded-[5px] grid gap-2 p-2">
              <h2 className="text-xl font-bold"><ShoppingBag className="mr-1"/>Cart Summary</h2>
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
                    className="flex max-[476px]:flex-col justify-between items-start gap-4 hover:text-primary smooth-transition"
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
              <h2 className="text-xl font-bold"><ReceiptLong className="mr-1"/>Order Summary</h2>
              <div className="flex max-sm:flex-col max-sm:gap-1 max-sm:items-start justify-between gap-8 items-center">
                <p>
                  Total Product : <span>{TotalQuantity} </span>
                  {TotalQuantity > 1 ? 'items' : 'item'}
                </p>
                <p>
                  Subtotal :{" "}
                  <span className="underline underline-offset-4 font-bold text-lg ">
                    ${TotalPrice}
                  </span>
                </p>
              </div>
              {/* <form action="/api/checkout_sessions" method="post"> */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                className="bg-primary shadow-md text-white font-bold"
                onClick={() => handleCheckout()}
              >
                Proceed to Checkout
                <ShoppingCartCheckoutRounded
                  fontSize="small"
                  className="ml-1"
                />
              </Button>
              {/* </form> */}
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
            <Button
              variant="contained"
              className="bg-primary text-white capitalize my-2"
            >
              start shopping
            </Button>
          </Link>
        </div>
      )}
    </NoSsr>
  );
};

export default MyCart;
