import React, { type FC } from "react";
import { Button } from "antd";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Cart: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col justify-center items-center gap-10 p-10 rounded-2xl">
      <HiOutlineShoppingCart className="text-4xl text-[#243F2F]" />
      <h2 className="font-semibold text-[#243F2F] text-base md:text-xl">
        Your cart is currently empty
      </h2>
      <Button onClick={() => navigate("/")} className="w-36" type="default">
        Return To Shop
      </Button>
    </div>
  );
};

export default Cart;
