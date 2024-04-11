import React, { type FC } from "react";
import {
  RiShoppingCartLine,
  RiUserLine,
  RiMenuLine,
  RiSearchLine,
} from "react-icons/ri";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

// const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//   console.log(info?.source, value);

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white">
      <RiMenuLine className="text-xl cursor-pointer hover:text-[#00D783] duration-150 md:hidden" />
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-32 md:w-36 cursor-pointer"
        src={require("../../../assets/images/logo.jpg")}
      />
      <Input
        placeholder="Start typing ..."
        // onSearch={onSearch}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        prefix={<RiSearchLine className="text-[#243F2F] pr-2 text-2xl" />}
        className="hidden h-10 md:w-1/3 md:flex"
      />
      <div className="flex gap-4">
        <RiUserLine
          className="text-xl cursor-pointer hover:text-[#00D783] duration-150"
          onClick={() => navigate("/login")}
        />
        <RiShoppingCartLine className="text-xl cursor-pointer hover:text-[#00D783] duration-150" />
      </div>
    </div>
  );
};

export default Header;
