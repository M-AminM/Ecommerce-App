import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

const Category: FC = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "vegetables" },
    { name: "meat" },
    { name: "seafood" },
    { name: "eggs" },
    { name: "drinks" },
  ];

  return (
    <div className="bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl font-semibold text-[#243F2F]">
        Featured Categories
      </h2>
      <div className="flex gap-14">
        {categories.map((category) => (
          <img
            className="w-24 rounded-lg cursor-pointer"
            src={require(`../../../assets/images/${category.name}.png`)}
            alt={category.name}
            key={category.name}
            onClick={() => navigate(`/product-category/${category.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
