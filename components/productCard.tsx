import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Stack } from '@mui/material';

export interface ICardProps {
}
export default function ProductCard (props: ICardProps) {
  return (
    <Card className='max-w-[170px]'>
      <CardMedia
      image='https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/11/18/552ba719-2b32-4471-905c-88c5785f3d97.jpg.webp?ect=4g'
      className='w-full h-[137px]'
      />
        <CardContent className='p-2 last:pb-2'>
        <Typography gutterBottom className='text-[14px] min-h-[16px] overflow-ellipsis overflow-hidden whitespace-pre-wrap line-clamp-2' component="div">
          Macbook Air M1 256GB/8GB ORIGINAL with special M1 Chip from apple to Performance
        </Typography>
        <Typography className='font-bold text-lg' color="text.secondary">
         999$
        </Typography>
        <Stack direction='row' alignItems='center'> 
        <Rating name="read-only" value={4.3} precision={0.5} readOnly size='small'/>
        <Typography className='font-bold'>4.5</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
