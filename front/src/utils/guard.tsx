import React from "react";
import { Navigate } from "react-router-dom";

const Guard = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Guard;
