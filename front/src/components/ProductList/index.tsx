import React, { type FC } from "react";
import Product from "./Product";
import { ProductType } from "../../@types/product";

type ProductListProps = {
  data: ProductType[];
};

const ProductList: FC<ProductListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data.map((product: ProductType, index: number) => (
        <Product product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;
