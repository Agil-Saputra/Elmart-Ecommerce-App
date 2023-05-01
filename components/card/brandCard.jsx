import { Avatar, Stack, Typography } from '@mui/material';

export default function BrandCard ({title, desc, logo}) {
  return (
    <div className='flex cursor-pointer justify-between shadow-lg p-6 items-center border-2 my-6 gap-4 hover:scale-105 active:scale-100 smooth-transition rounded-lg ]'>
      <Avatar 
      src={'https:' + logo}
      sx={{
        '& .MuiAvatar-img' : {
          objectFit : 'contain',
          p : 1
        }
      }}
      className='w-[60px] h-[60px] hover:scale-105'/>
   <Stack width='15ch'>
   <Typography className='text-xl font-bold capitalize'>
        {title}
      </Typography>
   <Typography className='handle-text-overflow line-clamp-2'>
        {desc}
      </Typography>
   </Stack>

    </div>
  );
}
