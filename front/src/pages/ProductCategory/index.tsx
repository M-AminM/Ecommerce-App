import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../service/service";

const ProductCategory = () => {
  const { category } = useParams();
  const { data, isPending } = useFetch("products");
  console.log(isPending);

  if (isPending) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="text-red-500 flex justify-center items-center">
      <div>
        <h3>{category}</h3>
        {data?.data.products?.map((item: any) => (
          <div className="flex flex-col items-center bg-red-400">
            <h3>{item.name}</h3>
            <img
              className="w-36 rounded-xl h-28"
              src={item.image_url}
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
