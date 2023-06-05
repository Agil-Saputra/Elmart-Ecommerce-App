import { contentfulClient } from "@/cms/contentful";
import ProductCard from "@/components/card/productCard";
import { State } from "@/context/Provider";
import SomethingWrong from "../assets/Something went wrong.svg";
import Image from "next/image";

// fetch all products data from contentful
export async function getStaticProps() {
  const data = await contentfulClient("product");
  return {
    props: {
      products: data.items,
    },
  };
}

// retrieve searchQuery value from context
const AllProducts = ({ products }) => {
  const {
    state: { searchQuery },
  } = State();

// filter products based on user input query
  function filtered(arr) {
    return arr.filter(
      (item) =>
        item.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fields.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.fields.categoryref[0].fields.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }
  const filteredProducts = filtered(products);

  return (
    <div className="margin-top-global main-margin">
      {filteredProducts[0] ? (
        <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 min-h-[90vh]">
          {filteredProducts.map((item, i) => {
            const {
              slug,
              title,
              price,
              description,
              categoryref,
              productImages,
            } = item.fields;
            return (
              <ProductCard
                key={i}
                title={title}
                slug={slug}
                price={price}
                desc={description}
                category={categoryref[0].fields.title}
                image={productImages[0].fields.file.url}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-[80vh] text-center grid place-items-center">
         <div>
         <Image
            src={SomethingWrong}
            width={500}
            height={500}
            priority
            alt="Something Wrong ilustration"
          />
          <p className="text-xl font-medium mt-4 text-red-400">Sorry we couldnt find your product,<br/> please try another keyword</p>
         </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
