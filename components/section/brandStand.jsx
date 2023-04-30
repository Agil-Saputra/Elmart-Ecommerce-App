import BrandCard from '../card/brandCard';

export default function BrandStand () {
  return (
   <section className='main-margin-left my-10'>
      <p className='text-2xl md:text-3xl font-bold mb-3 md:mb-6'>Our Best Brands</p>
     <div className="grid grid-flow-col gap-4 overflow-x-auto overscroll-contain px-5 snap-start overflow-hidden">
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
