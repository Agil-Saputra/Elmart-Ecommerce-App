import * as React from 'react';
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
 } from '@mui/material';
 import { styled } from '@mui/material/styles';
 import InputBase from '@mui/material/InputBase';
// import all icons from material icons
 import SearchIcon  from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import assets for logo Image
import Image from 'next/image';
import logo from "../assets/logo.svg"
export default function Navbar () {
  // create an setAnchor for Popover components 
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openNav, setOpenNav] = React.useState<boolean>(false)
  const [expand, setExpand] = React.useState<boolean>(false)
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNav = () => {
    setOpenNav(false);
  };

const open = Boolean(anchorEl);

const handleExpand = () => {
 setExpand(!expand)
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative', 
  height : '2rem',
  borderRadius: theme.shape.borderRadius,
  border : '1px solid #BFC9D9',
  backgroundColor: 'transparent',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const pages = ["Products", "What's New", "Deals", "Delivery"]
const categories = ["handphone", "laptop/computer", "TV & monitor", "Appliances", "Accesories"]
  return (
    <AppBar className='bg-white p-2 shadow-md flex items-center flex-row justify-between gap-2'>
    <Image
   src={logo}
   alt='elmart logo'
   width={100}
   height={37}
   />

   <Stack direction='row' spacing={1} className='xmd:flex hidden '>
    <Button className='text-black py-1 px-2 rounded-[15px] capitalize' onClick={(e) => setAnchorEl(e.currentTarget)}>
        Categories
        <ExpandMoreRoundedIcon/>
      </Button>
      <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <Stack direction="column">
        {categories.map((item :string) =>  (
          <Button className='capitalize text-left block' key={item}>
            {item}
          </Button>
        ))}
        </Stack>
      </Popover>
    {pages.map((menu : string) => <Button className='text-black py-1 px-2 rounded-[15px] capitalize overflow-ellipsis cursor-pointer ' href={`/${menu.toLowerCase()}`} key={menu}>{menu}</Button>)}
         
</Stack>

       <Stack direction='row' alignItems='center' className='md:gap-2'>
       <Search>
            <SearchIconWrapper>
              <SearchIcon className='text-[#BFC9D9]'/>        
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => console.log(e.target.value)}
            />
          </Search>

          <IconButton >
            <ShoppingCartIcon />
          </IconButton>

          <IconButton className='flex xmd:hidden' onClick={() => setOpenNav(true)}>
            <MenuIcon />
          </IconButton>
       </Stack>
      
       <SwipeableDrawer 
       anchor="left"
       open={openNav}
       onOpen={() => setOpenNav(true)}
       onClose={() => setOpenNav(false)}
       sx={{
        '& .MuiDrawer-paper' : {
          p : '1rem' 
        }
       }}
       >
      
       <MenuItem onClick={handleExpand}>
        Categories
        <>{expand ? <ExpandLess/> : <ExpandMore/>}</>
        </MenuItem>
        <Collapse in={expand}>
         <Stack direction="column" textAlign='left'>
         {categories.map((item: string) => (
            <Button key={item} className='text-left block capitalize'>{item}</Button>
          ))}
         </Stack>
        </Collapse>
        {pages.map((item: string) => (
          <MenuItem key={item}>
            {item}
          </MenuItem>
        ))}

   
       </SwipeableDrawer>
    </AppBar>
  );
}

