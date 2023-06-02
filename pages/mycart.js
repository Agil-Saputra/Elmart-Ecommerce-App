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
import RemoveFromCartButton from "@/components/ui/removeFromCartButton";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm, Controller, set } from "react-hook-form";

import emptycart from "../assets/Empty Cart.svg";
import NoAddress from "../assets/No Navigation.svg";
import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
export const useFetch = (URL, setData) => {
    
  axios
  .get(URL, {
    headers: {
      'X-CSCAPI-KEY' : 'NjVhMzdaajl2VkpPanBmYlMyWUdGalAyenNUNWdyUWt4aDNjZFFFZQ=='
    },
  })
  .then((res) => {
    setData(res.data)
  })
  .catch((err) => {
    console.log(err);
  });

}

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
    clearErrors
  } = useForm({});

  const {
    state: { cart, address },
    dispatch,
  } = State();

  const router = useRouter();

  useEffect(() => {
    axios
    .get("https://api.countrystatecity.in/v1/countries", {
      headers: {
        'X-CSCAPI-KEY' : process.env.API_KEY
      },
    })
    .then((res) => {
      setCountryData(res.data)
    })
    .catch((err) => {
      console.log(err);
    });

    axios
    .get(`https://api.countrystatecity.in/v1/countries/${countryName}/states`, {
      headers: {
        'X-CSCAPI-KEY' : process.env.API_KEY
      },
    })
    .then((res) => {
      setStatesData(res.data)
    })
    .catch((err) => {
      console.log(err);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  useEffect(() => {

    axios
    .get(`https://api.countrystatecity.in/v1/countries/${countryName}/states/${stateName}/cities`, {
      headers: {
        'X-CSCAPI-KEY' : process.env.API_KEY
      },
    })
    .then((res) => {
      setCitiesData(res.data)
    })
    .catch((err) => {
      console.log(err);
    });

  }, [stateName]);

  const TotalQuantity = cart.reduce((a, b) => a + +(+b.quantity), 0);
  const TotalPrice = cart.reduce((a, b) => a + +(+b.price) * b.quantity, 0);

  async function handleCheckout() {
    if (!shippingData?.countryName || null) {
      setError(true);
    } else {
      try {
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors()
  };


  return (
    <NoSsr>
      {cart[0] ? (
        <div className="margin-top-global main-margin flex max-md:flex-col-reverse gap-4">
          <div className={error ? "border-red-500 " : "border-slate-200" + " border-2 p-2 rounded-[5px] w-2/3 max-md:w-full h-fit sticky top-20"}>
            <h2 className="text-xl font-bold">Shipping Address</h2>
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
                          <Delete />
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
              <AddIcon />
              Add New Address
            </Button>
            <Dialog open={open} onClose={handleClose} className="p-2">
              <DialogTitle className="px-4 py-3 font-bold">
                Add New Shipping Address
              </DialogTitle>
              <Divider />
              <DialogContent>
                <form
                  className="grid gap-4"
                  onSubmit={handleSubmit((data) => {
                    if (!errors.streetAddress) {
                      dispatch({
                      type: "ADD_ADDRESS",
                      payload: data,
                    });
                    handleClose()
                    reset()
               
                    }
                
                  })}
                  autoComplete="off"
                >
                  <Controller
                    render={({ field, fieldState : {error} }) => (
                      <Autocomplete
                        sx={{ width: 500 }}
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

                  <div className="flex gap-4 justify-between">
                    <Controller
                      render={({ field, fieldState : {error} }) => (
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
                      render={({ field, fieldState : {error} }) => (
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
                    render={({ field, fieldState : {error} }) => (
                      <TextField {...field} label="Recipient Name" fullWidth error={error}/>
                    )}
                    name="recipientName"
                    control={control}
                    rules={{ required: true }}
                  />
                  <Controller
                    render={({ field, fieldState : {error}}) => (
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
                    rules={{ required: true }}
                  />

                  <div className="flex gap-2">
                    <Controller
                      render={({ field, fieldState : {error} }) => (
                        <TextField
                          {...field}
                          label="Street Address"
                          className="w-[90%]"
                          error={error}
                        />
                      )}
                      name="streetAddress"
                      control={control}
                      rules={{ required: true }}
                    />
                    <Controller
                      render={({ field , fieldState : {error}}) => (
                        <TextField
                          {...field}
                          label="Zip Code"
                          className="w-2/3"
                          variant="outlined"
                          error={error}
                        />
                      )}
                      name="zipCode"
                      control={control}
                      rules={{ required: true }}
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      className="hover:border-red-300 border-red-400 text-red-400"
                      onClick={handleClose}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      
                      variant="outlined"
                    >
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
                <p>
                  Total Product : <span>{TotalQuantity}</span>
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
                <ShoppingCartCheckoutRoundedIcon fontSize="small" className="ml-1"/>
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
