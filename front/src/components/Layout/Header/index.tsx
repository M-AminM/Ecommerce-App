import React, { useEffect, useState, type FC } from "react";
import {
  RiShoppingCartLine,
  RiUserLine,
  RiMenuLine,
  RiSearchLine,
} from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";
import { Badge, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { useGetUserById } from "../../../api/user";
import { useGetCart } from "../../../api/cart";
import HeaderAuth from "./HeaderAuth";

const { Search } = Input;

// const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//   console.log(info?.source, value);

const Header: FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="bg-white flex justify-between items-center px-4 py-4 md:px-10 sticky top-0 left-0 z-10">
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
      {token ? (
        <HeaderAuth />
      ) : (
        <MdOutlineLogin
          className="text-xl cursor-pointer hover:text-[#00D783] duration-150"
          onClick={() => navigate(`${"/login"}`)}
        />
      )}
    </div>
  );
};

export default Header;
