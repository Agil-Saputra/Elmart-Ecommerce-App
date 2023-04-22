import * as React from 'react';
import Image from 'next/image';

export interface IbannerProps {
}

export default function banner (props: IbannerProps) {
  return (  
    <Image 
    src="https://images.tokopedia.net/img/WVCyGU/2023/4/6/054e15b4-ba04-40bb-9eee-38299ff8c3c6.jpg"
    alt='banner image'
    width={960}
    height={120}
    className='w-full rounded-lg my-10 shadow-xl bg-red-400 '
    />
  );
}
