import * as React from 'react';
import Navbar from '@/components/appBar'
import Test from "@/components/test"

export interface IcartProps {
}

export default function cart (props: IcartProps) {
  return (
    <div>
       <Navbar />
      <Test />
    </div>
  );
}
