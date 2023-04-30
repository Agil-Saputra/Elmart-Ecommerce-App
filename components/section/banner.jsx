import Image from 'next/image';

export default function banner () {
  return (  
    <Image 
    src='https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/4/10/29d837ef-6d73-4278-be78-094a192eeba5.jpg.webp?ect=4g'
    alt='banner image'
    width={960}
    height={120}
    className='w-full mt-16 shadow-xl bg-red-400 '
    />
  );
}
