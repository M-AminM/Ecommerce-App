import React, { useState, type FC } from "react";
import type { SliderSingleProps } from "antd";
import { Button, Select, Spin } from "antd";
import { Slider } from "antd";
import ProductList from "../../components/ProductList";
import { useGetProducts } from "../../api/product";

const onChange = (value: number | number[]) => {
  console.log("onChange: ", value);
};

const onChangeComplete = (value: number | number[]) => {
  console.log("onChangeComplete: ", value);
};

const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
  value
) => `$${value}`;

const ProductsCategoryPage: FC = () => {
  const [sortPrice, setSortPrice] = useState("");
  const { data, isPending, isError } = useGetProducts({
    categoryId: 1,
    sortPrice,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Something wrong happened</div>;
  }

  return (
    <div className="bg-white rounded-2xl flex border border-[#D9E7D6] border-r-0 border-b-0">
      <div className="hidden md:block rounded-l-2xl h-full w-52 p-4">
        <span className="text-[#243F2F] font-semibold text-lg">Price</span>
        <Slider
          range
          step={10}
          defaultValue={[10, 30]}
          min={0}
          max={40}
          onChange={onChange}
          tooltip={{ formatter }}
          onChangeComplete={onChangeComplete}
        />
        <div className="pt-4">
          <Button className="w-full" type="default" htmlType="submit">
            Filter
          </Button>
        </div>
      </div>
      <div className="w-full border-l border-[#D9E7D6] rounded-r-2xl flex flex-col">
        <div className="flex justify-between border-b border-r rounded-t-2xl border-[#D9E7D6] p-4">
          <p className="text-sm">Showing all {data?.data.length} results</p>
          <Select
            // defaultValue=""
            value={sortPrice}
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSortPrice(value);
            }}
            options={[
              { value: "", label: "Not Sort" },
              { value: "DESC", label: "Sort by price: high to low" },
              { value: "ASC", label: "Sort by price: low to high" },
            ]}
          />
        </div>
        <ProductList data={data.data} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
