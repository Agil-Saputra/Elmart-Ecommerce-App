import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import * as React from 'react';
 
export interface ICategoryCardProps {
}

export default function CategoryCard (props: ICategoryCardProps) {
  return (
    <Box component='div' className='p-2 rounded-0 grid place-items-center text-center h-full w-full break-words border-r-2 border-b-2 border-solid cursor-pointer hover:shadow-lg active:scale-[.98] smooth'>
        <Avatar className='mb-3 w-[60px] h-[60px]'>L</Avatar>
       <div className='break-words overflow-hidden'>
         <Typography className='text-[15px]'>Laptop/Computer</Typography>  
       </div>
    </Box>
  );
}


