import React, { type FC } from "react";
import { useParams } from "react-router-dom";
// import { useFetch } from "../../service/service";
import type { MenuProps, SliderSingleProps } from "antd";
import { Button, Dropdown, Space, Spin } from "antd";
import { Slider } from "antd";
import { RiArrowDownSLine } from "react-icons/ri";
import ProductList from "../../components/ProductList";
import { useGetProducts } from "../../api/product";

const onChange = (value: number | number[]) => {
  console.log("onChange: ", value);
};

const onChangeComplete = (value: number | number[]) => {
  console.log("onChangeComplete: ", value);
};

const items: MenuProps["items"] = [
  {
    label: "Sort by price: low to high",
    key: "0",
  },
  {
    label: "Sort by price: high to low",
    key: "1",
  },
  {
    label: "Sort by discount",
    key: "3",
  },
];

const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
  value
) => `$${value}`;

enum Category {
  vegetables = 1,
  meat,
  seafood,
  eggs,
  drinks,
}

const ProductsCategoryPage: FC = () => {
  const { category }: any = useParams();
  const { data, isPending, isError, isSuccess } = useGetProducts({
    categoryId: 1,
  });
  // if (isSuccess) {
  // }

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
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a
              className="text-sm cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                Default sorting
                <RiArrowDownSLine />
              </Space>
            </a>
          </Dropdown>
        </div>
        <ProductList data={data.data} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
