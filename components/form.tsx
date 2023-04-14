import * as React from 'react';
import { TextField } from '@mui/material'

export default function EmailForm () {
  return (
    <div className='w-full bg-blue-200 h-[70px] '> 
      <form>
        <TextField 
        variant='outlined'
        className='border-black outline-black'
        />
      </form>
    </div>
  );
}
