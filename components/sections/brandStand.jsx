import BrandCard from "../card/brandCard";

export default function BrandStand({ data }) {
  console.log(data);
  return (
    <section className="main-margin-left my-[3.3rem]">
      <p className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">
        Our Best Brands
      </p>
      <div className="grid grid-flow-col gap-4 overflow-auto px-5">
        {data.map((item) => {
          const { title, desc, brandLogo } = item.fields;
          return (
            <BrandCard
              title={title}
              desc={desc}
              logo={brandLogo.fields.file.url}
            />
          );
        })}
      </div>
    </section>
  );
}
