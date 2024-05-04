import React, { useEffect, type FC } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../@types/product";
import { usePostCart } from "../../../api/cart";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";

type ProductProps = {
  product: ProductType;
  index: number;
};

type NotificationType = "success" | "info" | "warning" | "error";

const Product: FC<ProductProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { mutate, isSuccess, isError } = usePostCart();
  const openNotification = (
    placement: NotificationPlacement,
    type: NotificationType,
    description: string
  ) => {
    api[type]({
      message: type,
      description,
      placement,
      duration: 2,
    });
  };

  const addCartHandler = () => {
    const queryParams = {
      product_id: product.id,
      quantity: 1,
      total_amount: product.price,
    };
    mutate(queryParams);
  };

  useEffect(() => {
    if (isSuccess) {
      openNotification(
        "topLeft",
        "success",
        `${product.name} added successfully`
      );
    }
    if (isError) {
      openNotification("topLeft", "error", "something wrong happened");
    }
  }, [isSuccess, isError]);

  return (
    <div
      className={`border-r border-b border-[#D9E7D6] p-4 ${
        12 === index ? "rounded-br-2xl" : ""
      }`}
    >
      {contextHolder}
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
        <p className="text-xs text-[#66796E] h-20">{product.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold text-[#02A460]">${product.price}</span>
        <div
          onClick={addCartHandler}
          className="bg-[#EFF5EE] hover:bg-[#212121] hover:text-[#fff] duration-300 rounded-full p-3 cursor-pointer"
        >
          <RiShoppingCartLine className="text-base cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Product;
