import { Card, CardContent, Avatar, Typography, Box, CardMedia } from '@mui/material';
import oke from "../../assets/payment/paypal.svg"
 
export default function CategoryCard () {
  return (
    // <Box component='div' className='p-2 rounded-0 grid place-items-center text-center h-full w-full break-words border-r-2 border-b-2 border-solid cursor-pointer hover:shadow-lg active:scale-[.98] smooth'>
    //     <Avatar className='mb-3'>L</Avatar>
    //    <div className='break-words overflow-hidden'>
    //      <Typography className='text-[15px]'>Laptop/Computer</Typography>  
    //    </div>
    // </Box>
    <div className='cursor-pointer p-2 hover:shadow-xl hover:text-primary  smooth-transition grid place-items-center'>
     <div className='overflow-hidden w-[120px] h-[120px] rounded-[100px]'>
       <Avatar
        src='https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/11/18/552ba719-2b32-4471-905c-88c5785f3d97.jpg.webp?ect=4g'
        className='h-[120px] w-[120px] hover:scale-110 smooth-transition'
       />
     </div>
        <Typography className='my-3 text-xl'>Laptop/Komputer</Typography>
    </div>
  );
}


