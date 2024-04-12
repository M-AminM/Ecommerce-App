import React, { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <div className="relative">
      <Header />
      <div className="px-2 py-4 md:px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
