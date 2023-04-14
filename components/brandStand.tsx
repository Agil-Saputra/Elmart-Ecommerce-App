import * as React from 'react';
import BrandCard from './card/brandCard';

export interface IAppProps {
}

export default function BrandStand (props: IAppProps) {
  return (
   <section className='ml-2 sm:ml-10 lg:ml-20 my-10'>
      <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6'>Our Best Brands</p>
     <div className="grid grid-flow-col gap-4 overflow-x-auto overscroll-contain ">
       <BrandCard/>
       <BrandCard/>
       <BrandCard/>
       <BrandCard/>
       <BrandCard/>
       <BrandCard/>
     </div>
   </section>
  );
}
