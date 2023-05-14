import Slider from "react-slick";
import Image from 'next/image';

export default function Carousel ({data}) {
    const settings = {
        dots: true,
        dotsClass: 'dots',
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoPlaySpeed : 300,
      };
      
      const carouselImages = data[0].fields.carouselBanner
  return (
    <Slider 
    autoplay {...settings} 
    className='w-full main-padding md:mt-24 mt-16'>
        {carouselImages.map((item, index) => {
          const image = item.fields
          return  (
            <a key={index} href={'/'}>
            <Image
            src={'https:' + image.file.url}
            alt={image.title}
            priority
            width={1684}
            height={421}
            className='w-full h-full rounded-[5px]'
            />
            </a>
        )
        })}
    </Slider>
  );
}
