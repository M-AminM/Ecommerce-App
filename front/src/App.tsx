import React, { type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProductCategory from "./pages/ProductCategory";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product-category/:category"
          element={<ProductCategory />}
        />
      </Route>
    </Routes>
  );
};

export default App;
