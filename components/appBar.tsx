import * as React from "react";
// import all material UI components and function
import {
  AppBar,
  IconButton,
  Stack,
  Button,
  Popover,
  SwipeableDrawer,
  MenuItem,
  Collapse,
  Autocomplete,
  TextField,
  useAutocomplete,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import all icons from material icons
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import assets for logo Image
import Image from "next/image";
import logo from "../assets/logo.svg";
import { top100Films } from "./test";
export default function Navbar() {
  // create an setAnchor for Popover components so the component can be open/close and set the anchor in same time
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  // define a state for toggling the drawer navigation on mobile view
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  // set expand state to togggling expand for categories components
  const [expand, setExpand] = React.useState<boolean>(false);

  // create a function to close the popOver when popover is clicked
  const handleClose = () => {
    setAnchorEl(null);
  };
  // create a function to close the drawer navigation whenmenu button is clicked
  const handleCloseNav = () => {
    setOpenNav(false);
  };
  // set function to toggle the expand categories element
  const handleExpand = () => {
    setExpand(!expand);
  };

  // convert anchorEl to boolean so it can be use for showing/not showing the components
  const open = Boolean(anchorEl);

  const pages = ["Products", "Deals", "Delivery"];
  const categories = [
    "handphone",
    "laptop/computer",
    "TV & monitor",
    "Appliances",
    "Accesories",
  ];


  return (
    // create appbar components for wrapping all components
    <AppBar className="bg-white p-2 shadow-md flex items-center flex-row justify-between gap-2 relative">
      {/* create image logo elements using next image for optimization */}
      <a href="/">
        <Image src={logo} alt="elmart logo" width={100} height={37} />
      </a>


      <Autocomplete
        id="grouped-demo"
        onInputChange={(event: React.SyntheticEvent, value: string) =>
          console.log(value)
        }
        freeSolo
        options={top100Films.map((option) => option.title)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            className="mlg:w-[30rem]"
            {...params}
            InputProps={{
              ...params.InputProps,
              size:"small",
              placeholder: "Search Elemart products...",
              startAdornment: (
                <InputAdornment position="start" className="mr-0 ml-1">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />


      


      <Stack direction="row" alignItems="center" className="md:gap-2">
        {/* using stack to wrap all navigation links and categories link */}
        <Stack direction="row" spacing={1} className="xmd:flex hidden ">
          {/* special categories link that containing all categories using popover */}
          <Button
            className="text-black py-1 px-2 rounded-[15px] capitalize"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Categories
            <ExpandMoreRoundedIcon />
          </Button>
          {/* create a pop over for desktop view that contained all categories */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {/* create a stack component to wrap button so it can be in column direction */}
            <Stack direction="column">
              {categories.map((item: string) => (
                <Button className="capitalize text-left block" key={item}>
                  {item}
                </Button>
              ))}
            </Stack>
          </Popover>


          {/* mapping all links with button and href link so it can be used to navigate all pages */}
          {pages.map((menu: string) => (
            <Button
              className="text-black py-1 px-2 rounded-[15px] capitalize overflow-ellipsis cursor-pointer "
              href={`/${menu.toLowerCase()}`}
              key={menu}
            >
              {menu}
            </Button>
          ))}
        </Stack>

        <IconButton href="/cart">
          <ShoppingCartIcon />
        </IconButton>

        <IconButton
          className="flex xmd:hidden"
          onClick={() => setOpenNav(true)}
        >
          <MenuIcon />
        </IconButton>
      </Stack>

      <SwipeableDrawer
        anchor="left"
        open={openNav}
        onOpen={() => setOpenNav(true)}
        onClose={() => setOpenNav(false)}
        sx={{
          "& .MuiDrawer-paper": {
            p: "1rem",
          },
        }}
      >
        <MenuItem onClick={handleExpand}>
          Categories
          <>{expand ? <ExpandLess /> : <ExpandMore />}</>
        </MenuItem>
        <Collapse in={expand}>
          <Stack direction="column">
            {categories.map((item: string) => (
              <Button key={item} className="text-left block capitalize">
                {item}
              </Button>
            ))}
          </Stack>
        </Collapse>
        {pages.map((item: string) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
      </SwipeableDrawer>
    </AppBar>
  );
}
