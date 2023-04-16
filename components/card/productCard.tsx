import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Stack, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

export interface ICardProps {
}
export default function ProductCard (props: ICardProps) {
  return (
     <Card className='ms:w-full shadow-none cursor-pointer p-3 hover:scale-[1.02] border-2 smooth active:scale-[1.01]'>
       <CardMedia
       image='https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/11/18/552ba719-2b32-4471-905c-88c5785f3d97.jpg.webp?ect=4g'
       className='w-full h-[180px] md:h-[200px] rounded-[2px] object-fill'
       />
         <CardContent className='p-1 last:pb-0'>
        <Typography className='font-bold text-sm' color="text.secondary">
          Laptop/Computer
         </Typography>
        <Stack direction='row' justifyContent='space-between' gap={2}>
         <Typography className='font-bold text-lg text-black'>
          Macbook Air M1 
         </Typography>
         <Typography className='font-bold text-xl text-black'>
          999$
         </Typography>
        </Stack>
         <Typography className='text-[14px] min-h-[16px] overflow-ellipsis overflow-hidden whitespace-pre-wrap line-clamp-2 my-2' component="div">
           Macbook Air M1 256GB/8GB ORIGINAL with special M1 Chip from apple to Performance
         </Typography>
        <Button startIcon={<AddShoppingCartRoundedIcon/>} fullWidth variant='contained' className='bg-primary text-white shadow-md text-[10px] md:text-[12px]'>
         Add to cart
        </Button>
       </CardContent>
     </Card>
  );
}
