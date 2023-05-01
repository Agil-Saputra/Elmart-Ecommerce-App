import { Card, CardContent, Avatar, Typography, Box, CardMedia } from '@mui/material';
import oke from "../../assets/payment/paypal.svg"
 
export default function CategoryCard ({title, image}) {
  return (
    // <Box component='div' className='p-2 rounded-0 grid place-items-center text-center h-full w-full break-words border-r-2 border-b-2 border-solid cursor-pointer hover:shadow-lg active:scale-[.98] smooth'>
    //     <Avatar className='mb-3'>L</Avatar>
    //    <div className='break-words overflow-hidden'>
    //      <Typography className='text-[15px]'>Laptop/Computer</Typography>  
    //    </div>
    // </Box>
    <div className='cursor-pointer p-2 hover:shadow-xl hover:text-primary border-[1px] rounded-[5px] smooth-transition grid place-items-center'>
     <div className='overflow-hidden w-[120px] h-[120px] rounded-[100px] border-[1px]'>
       <Avatar
        src={'https://' + image}
        className='h-[120px] w-[120px] hover:scale-110 smooth-transition'
       />
     </div>
        <Typography className='my-3 text-xl handle-text-overflow line-clamp-1'>{title}</Typography>
    </div>
  );
}


