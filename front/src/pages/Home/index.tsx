import React, { type FC } from "react";
import Header from "./Header";
import Category from "./Category";

const HomePage: FC = () => {
  return (
    <div className=" flex flex-col gap-6">
      <Header />
      <Category />
    </div>
  );
};

export default HomePage;
