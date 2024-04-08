import React, { type FC } from "react";
import { Button, Checkbox, Form, type FormProps, Input, Flex } from "antd";
import { useCreate } from "../../service/service";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: FC = () => {
  const { mutate } = useCreate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const props = {
      url: "users",
      data: values,
    };
    mutate(props);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-white flex flex-col p-10 rounded-xl border border-[#E0EBDE]">
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
            rules={[{ required: true, message: "Please input your email!" }]}
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
        <div className="flex justify-between">
          <span className="text-sm">Not A Member?</span>
          <Button type="link" htmlType="submit">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
