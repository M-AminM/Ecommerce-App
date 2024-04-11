import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../service/service";
import { RiShoppingCartLine } from "react-icons/ri";
import type { MenuProps, SliderSingleProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { RiArrowDownSLine } from "react-icons/ri";
import { Slider } from "antd";

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

const ProductCategory = () => {
  const { category }: any = useParams();

  const { data, isPending } = useFetch(
    `products/category/${Category[category!]}`
  );
  console.log(isPending);

  const navigate = useNavigate();
  if (isPending) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl flex border border-[#D9E7D6] border-r-0 border-b-0">
      <div className="rounded-l-2xl h-full w-52 p-4">
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
          <p className="text-sm">
            Showing all {data?.data.products.length} results
          </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data?.data.products.map((product: any, index: number) => (
            <div
              className={` border-r border-b border-[#D9E7D6] p-4 ${
                data?.data.products.length - 1 === index ? "rounded-br-2xl" : ""
              }`}
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`./${product.id}`)}
              >
                <div className="relative flex justify-center">
                  <img className="w-48" src={product.image_url} />
                  {product.discount !== 0 && (
                    <span className="bg-red-400 text-white font-semibold px-4 py-0.5 rounded-xl text-xs absolute top-0 left-0">
                      {product.discount}%
                    </span>
                  )}
                </div>

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-xs text-[#66796E] h-20">
                  {product.description}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-[#02A460]">
                  ${product.price}
                </span>
                <div className="bg-[#EFF5EE] hover:bg-[#212121] hover:text-[#fff] duration-300 rounded-full p-3 cursor-pointer">
                  <RiShoppingCartLine className="text-base cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
