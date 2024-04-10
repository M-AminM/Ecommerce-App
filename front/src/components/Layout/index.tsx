import React, { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <div className="">
      <Header />
      <div className="px-10 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
