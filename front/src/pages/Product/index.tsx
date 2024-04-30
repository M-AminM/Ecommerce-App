import React, { useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { ProductType } from "../../@types/product";
import { FiPlus, FiMinus } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { useGetProductById } from "../../api/product";

const Product: FC = () => {
  const [count, setCount] = useState<number>(0);
  const { id, category }: any = useParams();

  // const { data, isPending, isError } = useFetch(`products/${id}`);

  const { data, isPending, isError } = useGetProductById(id);

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  const { description, discount, image_url, name, price, quantity } =
    data!.data;

  return (
    <div className={`border border-[#D9E7D6] p-4 rounded-2xl bg-white`}>
      <div className="relative flex flex-col justify-between w-full md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-80" src={image_url} />
          {discount !== 0 && (
            <span className="bg-red-400 text-white font-semibold px-4 py-0.5 rounded-xl text-xs absolute top-0 left-0">
              {discount}%
            </span>
          )}
        </div>

        <div className="w-full md:w-1/2 flex justify-center flex-col gap-2">
          <h2 className={`text-[#243F2F] font-bold text-2xl md:text-3xl`}>
            {name}
          </h2>
          <p>{description}</p>
          <span className="text-[#00AA63] font-bold text-lg md:text-xl">
            ${price}
          </span>
          <div>
            <span className="text-base md:text-xl">Available: {quantity}</span>
          </div>
          <div className="flex justify-start gap-4 select-none py-2">
            <div className="flex items-center gap-4">
              <Button
                className="w-12"
                type="default"
                onClick={() => {
                  if (count > 0) {
                    setCount((prev) => prev - 1);
                  }
                }}
              >
                <FiMinus className="cursor-pointer" />
              </Button>
              {count}
              <Button
                className="w-12"
                type="default"
                onClick={() => {
                  if (count < quantity) {
                    setCount((prev) => prev + 1);
                  }
                }}
              >
                <FiPlus className="cursor-pointer" />
              </Button>
            </div>

            <Button className="w-32 flex gap-2 items-center" type="primary">
              <RiShoppingCartLine className="text-base cursor-pointer hover:text-[#00D783] duration-150" />
              Add To Cart
            </Button>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <div className="flex gap-2 items-center text-sm">
              <FaCheck className="text-[#00AA63]" />
              <span>100% Money Back Warranty</span>
            </div>

            <div className="flex gap-2 items-center text-sm">
              <FaCheck className="text-[#00AA63]" />
              <span>Free and Fast Delivery</span>
            </div>

            <div className="flex gap-2 items-center text-sm">
              <FaCheck className="text-[#00AA63]" />
              <span>All Items Top Best Quality</span>
            </div>

            <div className="flex gap-2 items-center text-sm">
              <FaCheck className="text-[#00AA63]" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
