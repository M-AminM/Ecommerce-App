import React, { useState, type FC } from "react";
import { Button, Spin } from "antd";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGetCart } from "../../api/cart";

const Cart: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<any>(1);
  const { data, isPending, isError, error } = useGetCart();
  if (isError) {
    if (error instanceof Error && error.message.includes("401")) {
      console.log("unuthorized use login");
    }
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  console.log(data);

  return (
    <div className="bg-white lg:p-10 rounded-2xl">
      {data!.data.length === 0 ? (
        <>
          <HiOutlineShoppingCart className="text-4xl text-[#243F2F]" />
          <h2 className="font-semibold text-[#243F2F] text-base md:text-xl">
            Your cart is currently empty
          </h2>
          <Button onClick={() => navigate("/")} className="w-36" type="default">
            Return To Shop
          </Button>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full">
            {data!.data.map((item: any) => (
              <div className="flex justify-between border-b border-[#D9E7D6] p-4">
                <div className="flex items-center gap-2">
                  <img className="w-24" src={item.product.image_url} />
                  <div>
                    <h3 className="font-semibold text-base">
                      {item.product.name}
                    </h3>
                    <span className="text-sm">${item.product.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg border border-[#D9E7D6]">
                        <FiMinus className="cursor-pointer" />
                      </div>

                      {item.quantity}
                      <div className="p-1 rounded-lg border border-[#D9E7D6]">
                        <FiPlus className="cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <span>${item.total_amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4">
            <div className="h-full border border-[#243F2F] rounded-2xl px-4 pt-2 pb-6 w-full md:w-72 lg:w-[28rem]">
              <div className="flex justify-between items-center border-b border-[#D9E7D6] py-4">
                <h3 className="text-lg ">Subtotal</h3>
                <span className="text-[#00AA63] font-bold">$20</span>
              </div>

              <div className="flex flex-col border-b border-[#D9E7D6] py-4">
                <h3 className="text-lg pb-2">Shipping</h3>
                <div className="flex justify-between">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <Radio value={1}>Flat rate:</Radio>
                      <Radio value={2}>Free shipping</Radio>
                      <Radio value={3}>Local pickup</Radio>
                    </Space>
                  </Radio.Group>
                  <span className="text-[#00AA63] font-bold">$30</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <h3 className="text-lg py-4">Total</h3>
                <span className="text-[#00AA63] font-bold">$100</span>
              </div>
              <Button className="w-full" type="primary">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
