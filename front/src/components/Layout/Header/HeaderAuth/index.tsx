import React, { type FC, useEffect } from "react";
import { useGetCart } from "../../../../api/cart";
import { RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import { Badge, Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const HeaderAuth: FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    data: cartData,
    refetch: refetchCartData,
    isSuccess: isCartSuccess,
    isError: isErrorCart,
    error,
  } = useGetCart();

  useEffect(() => {
    refetchCartData();
  }, [token]);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    // message.info(`Click on item ${key}`);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex gap-2">
          <h3 className="font-semibold">Email: </h3>
          <span>{localStorage.getItem("email") ?? ""}</span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full"
          type="primary"
        >
          Log out
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <Dropdown className="pt-2" menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <RiUserLine
              className="text-xl cursor-pointer hover:text-[#00D783] duration-150"
              //   onClick={() => navigate(``)}
            />
          </Space>
        </a>
      </Dropdown>
      <Badge
        count={isCartSuccess && token ? cartData?.data.length : 0}
        color="#243F2F"
      >
        <RiShoppingCartLine
          className="text-xl cursor-pointer hover:text-[#00D783] duration-150"
          onClick={() => navigate("/cart")}
        />
      </Badge>
    </div>
  );
};

export default HeaderAuth;
