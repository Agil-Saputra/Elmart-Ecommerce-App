import React from 'react';
import { IconButton, Drawer, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

export default function cart () {
    const [drawerOpen, setDrawerOpen] = React.useState(false)


function handleDrawerToggle () {
    setDrawerOpen(!drawerOpen)
}


  return (
 <>
       <IconButton onClick={handleDrawerToggle}>
       <ShoppingCart />
     </IconButton>
    
     <Drawer anchor='bottom' open={drawerOpen} onClose={handleDrawerToggle} sx={{
        "& .MuiDrawer-paper" : {
            p: 3
        }
        }}>
    <Typography variant='h4'>Order Summary<ShoppingCart fontSize='large' className='ml-2'/></Typography>
    <Typography variant='h5'>You dont have any products...</Typography>
     </Drawer>
 </>

  );
}
