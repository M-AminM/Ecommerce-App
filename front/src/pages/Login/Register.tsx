import React, { useEffect, type FC } from "react";
import { Button, Form, type FormProps, Input, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useSignupUser } from "../../api/user";
import { UserPostInterface } from "../../interfaces/user";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

const Register: FC = () => {
  const { mutate, isSuccess, isError } = useSignupUser();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
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
    form.resetFields();
    mutate(values as UserPostInterface);
  };

  useEffect(() => {
    if (isSuccess) {
      openNotification(
        "topLeft",
        "success",
        "Congratulations, your account has been successfully created \n Please login"
      );
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
        form={form}
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
