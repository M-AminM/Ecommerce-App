import React, { type FC } from "react";
import {
  AudioOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

// const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//   console.log(info?.source, value);

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <img className="w-36" src={require("../../../assets/images/logo.jpg")} />
      <Search
        placeholder="input search text"
        // onSearch={onSearch}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        style={{ width: 200 }}
      />
      <div className="flex gap-4">
        <UserOutlined
          className="text-xl cursor-pointer"
          onClick={() => navigate("/login")}
        />
        <ShoppingCartOutlined className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
