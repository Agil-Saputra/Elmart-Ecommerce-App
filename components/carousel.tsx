import * as React from 'react';
import Slider from "react-slick";
import Image from 'next/image';

export interface carouselProps {
}

export default function carousel (props: carouselProps) {
    const settings = {
        dots: true,
        dotsClass: 'dots',
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoPlaySpeed : 400,
      };

      const urls = [
        'https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/4/10/29d837ef-6d73-4278-be78-094a192eeba5.jpg.webp?ect=4g',
        'https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/4/10/d8ddb53a-71e8-4c4d-96b8-f0f32c958843.jpg.webp?ect=4g',
        'https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/4/10/7093d806-1eb4-47fa-8934-bac42bd8aeda.jpg.webp?ect=4g'
      ]
  return (
    <Slider autoplay {...settings} className='w-full mt-10 rounded-xl'>
        {urls.map((item : string) => (
            <a key={item} href={'/'}>
            <Image
            src={item}
            alt='banner image'
            width={1684}
            height={421}
            className='w-full h-full rounded-xl shadow-xl'
            />
            </a>
        ))}
    </Slider>
  );
}
