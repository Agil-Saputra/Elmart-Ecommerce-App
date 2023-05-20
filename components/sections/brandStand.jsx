import BrandCard from "../card/brandCard";

export default function BrandStand({ data }) {
  return (
    <section className="main-margin-left my-[3.3rem]">
      <p className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">
        Our Best Brands
      </p>
      <div className="grid grid-flow-col gap-3 overflow-auto px-5 overflow-x-scroll overflow-y-hidden snap-x snap-mandatory snap-always ">
        {data.map((item) => {
          const { title, desc, brandLogo, slug } = item.fields;
          return (
            <BrandCard
              title={title}
              slug={slug}
              desc={desc}
              logo={brandLogo.fields.file.url}
              key={title}
            />
          );
        })}
      </div>
    </section>
  );
}
