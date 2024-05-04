import React, { Fragment, useEffect } from "react";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type NotificationType = "success" | "info" | "warning" | "error";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

const AxiosInterceptor = ({ children }: any) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    type: NotificationType,
    description: string
  ) => {
    api[type]({
      message: type,
      description,
      placement,
      duration: 2,
    });
  };

  instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `${token}`;
    return config;
  });

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      console.log(error);
      if (error.response.status === 401) {
        openNotification(
          "topLeft",
          "error",
          "Access is denied due to invalid credentials."
        );
        localStorage.clear();
        navigate("/login");
      }

      return Promise.reject(error);
    };
    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [navigate]);

  return (
    <Fragment>
      {children}
      {contextHolder}
    </Fragment>
  );
};

export default instance;
export { AxiosInterceptor };
