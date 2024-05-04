import React, { Fragment, useState, type FC } from "react";
import Signup from "./Signup";
import { Button } from "antd";
import Login from "./Login";

const LoginPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div className="bg-white flex flex-col p-10 rounded-xl border border-[#E0EBDE]">
        <h1 className="text-center text-xl font-semibold pb-10">
          {isLogin ? "Login" : "Register"}
        </h1>
        {isLogin ? <Login /> : <Signup />}

        <div className="flex items-center justify-between">
          <span className="text-sm">
            {isLogin ? "Not A Member?" : "You A Member?"}
          </span>
          <Button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            type="link"
            htmlType="submit"
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
