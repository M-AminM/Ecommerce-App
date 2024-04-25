import React, { type FC } from "react";
import { Button, Spin } from "antd";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../service/service";

const Cart: FC = () => {
  const navigate = useNavigate();

  const { data, isPending, isError } = useFetch(`cart?user_id=1`);
  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center gap-10 p-10 rounded-2xl">
      {data?.data.cart.length === 0 ? (
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
        <div>
          {data?.data.cart.map((item: any) => (
            <div>{item.Quantity}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
