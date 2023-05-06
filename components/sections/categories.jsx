import Slider from "react-slick";
import CategoryCard from "../card/categoryCard";

export default function FeaturedCategories({ data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    autoPlaySpeed: 300,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <section className="bg-white shadow-md rounded-md main-margin md:translate-y-[-3.3rem] translate-y-[-1rem] ">
      <p className="text-2xl md:text-3xl  font-bold mb-3 md:mb-6 sticky">
        All Categories
      </p>

      <Slider {...settings}>
        {data.map((item) => {
          const { title, categoryImage, slug } = item.fields;
          return (
            <div className="mr-4">
              <CategoryCard
                key={title}
                title={title}
                image={categoryImage.fields.file.url}
                slug={slug}
              />
            </div>
          );
        })}
        {data.map((item) => {
          const { title, categoryImage, slug } = item.fields;
          return (
            <div className="mr-4">
              <CategoryCard
                key={title}
                title={title}
                image={categoryImage.fields.file.url}
                slug={slug}
              />
            </div>
          );
        })}
        {data.map((item) => {
          const { title, categoryImage, slug } = item.fields;
          return (
            <div className="mr-4">
              <CategoryCard
                key={title}
                title={title}
                image={categoryImage.fields.file.url}
                slug={slug}
              />
            </div>
          );
        })}
        {data.map((item) => {
          const { title, categoryImage, slug } = item.fields;
          return (
            <CategoryCard
              key={title}
              title={title}
              image={categoryImage.fields.file.url}
              slug={slug}
            />
          );
        })}
      </Slider>
    </section>
  );
}
