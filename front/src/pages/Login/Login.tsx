import React, { useEffect, type FC } from "react";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  notification,
} from "antd";
// import { useCreate } from "../../service/service";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../api/user";
import { UserPostInterface } from "../../interfaces/user";
import { usePost } from "../../service/reactQuery";
import { apiRoutes } from "../../routes/apiRoutes";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

const Context = React.createContext({ name: "Default" });

const Login: FC = () => {
  const { mutate, isSuccess, isError, data } = useLoginUser();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values as UserPostInterface);
  };

  console.log(data?.data.user_id);

  useEffect(() => {
    if (isSuccess) {
      openNotification(
        "topLeft",
        "success",
        "Congratulations, your account has been successfully created"
      );
      localStorage.setItem("token", data?.data.token!);
      localStorage.setItem("user_id", data?.data.user_id!);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isError) {
      openNotification("topLeft", "error", "email or password is incorrect");
    }
  }, [isSuccess, isError]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
