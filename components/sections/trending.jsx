import ProductCard from "../card/productCard";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../ui/sliderArrows/Arrows";

export default function Trending({ data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    nextArrow : <NextArrow/>,
    prevArrow  : <PrevArrow/>,
    responsive: [
     
      {
        breakpoint: 883,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 712,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="mt-6 md:mt-[3.3rem] shadow-md rounded-md main-margin ">
      <p className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">
        Trending Products
      </p>
      <Slider {...settings} className="pl-1">
        {data.map((item) => {
          const {
            title,
            price,
            description,
            productImages,
            categoryref,
            slug,
            trending,
          } = item.fields;
          return trending ? (
              <ProductCard
                key={slug}
                title={title}
                price={price}
                desc={description}
                image={productImages[0].fields.file.url}
                category={categoryref[0].fields.title}
                slug={slug}
                trending={trending}
              />
          ) : null;
        })}
       
      </Slider>
    </section>
  );
}
