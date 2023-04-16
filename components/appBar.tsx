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

  // make styled  components for input search component
  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   height: "2rem",
  //   borderRadius: "30px",
  //   border: "1px solid #BFC9D9",
  //   backgroundColor: "transparent",
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));
  // // create a wrapper icon for search icon on input component
  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 1),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));
  // create input base using material inputbase to generate a search input for user type in.
  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   "& .MuiInputBase-input": {
  //     paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "20ch",
  //       "&:focus": {
  //         width: "30ch",
  //       },
  //     },
  //   },
  // }));

  const pages = ["Products", "Deals", "Delivery"];
  const categories = [
    "handphone",
    "laptop/computer",
    "TV & monitor",
    "Appliances",
    "Accesories",
  ];

  // const options = top100Films.map((option) => {
  // const firstLetter = option.title[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });

  // const {
  //   getRootProps,
  //   getInputLabelProps,
  //   getInputProps,
  //   getListboxProps,
  //   getOptionProps,
  //   groupedOptions,
  // } = useAutocomplete({
  //   id: 'use-autocomplete-demo',
  //   options: top100Films,
  //   getOptionLabel: (option) => option.title,
  // });

  // const Listbox = styled('ul')(({ theme }) => ({
  //   width: 200,
  //   margin: 0,
  //   padding: 0,
  //   zIndex: 1,
  //   position: 'absolute',
  //   listStyle: 'none',
  //   backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  //   overflow: 'auto',
  //   maxHeight: 200,
  //   border: '1px solid rgba(0,0,0,.25)',
  //   '& li.Mui-focused': {
  //     backgroundColor: '#4a8df6',
  //     color: 'white',
  //     cursor: 'pointer',
  //   },
  //   '& li:active': {
  //     backgroundColor: '#2977f5',
  //     color: 'white',
  //   },
  // }));

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  

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
        disableClearable
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            className="mlg:w-[30rem]"
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              className: 'rounded-[30px]',
              placeholder: "search your favorite products...",
              startAdornment: (
                <InputAdornment position="start" className="ml-2 mr-0">
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
