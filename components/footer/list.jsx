import { Typography } from '@mui/material';
import * as React from 'react';

export default function list ({menus, title}) {
  return (
    <div>
        <Typography className='font-bold text-lg'>{title}</Typography>
      <ul className='list-none'>
        {menus.map(item => (
          <li key={item}>
            <a href={item.toLowerCase().replace(/\s/g, '-')} className='hover:font-bold hover:pl-1 smooth-transition'>{item}</a>
          </li>
      ))}
      </ul>
  </div>
  );
}
