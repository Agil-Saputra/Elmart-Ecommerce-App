import { Typography } from '@mui/material';
import * as React from 'react';

export interface IlistProps {
    menus : string[]
    title : string
}

interface list {
    item : string
    index : number
}

export default function list ({menus, title}: IlistProps) {
  return (
    <div>
        <Typography className='font-bold text-lg'>{title}</Typography>
      <ul className='list-none'>
        {menus.map(item => (
          <li key={item}>
            <a href={item.toLowerCase().replace(/\s/g, '')} className='hover:font-bold'>{item}</a>
          </li>
      ))}
      </ul>
  </div>
  );
}
