import React from "react";
import { useState } from "react";

import { Alert, Button, Form, Input } from "antd";

import AuthService from "../../../Services/Auth";


const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);
  const [adminKeyError, setAdminKeyError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (values: any) => {
    setErrorMessage(null);
    handleRegister(values);
  };

  const onFinishFailed = async (errorInfo: any) => {
    setErrorMessage(errorInfo.errorFields[0].errors[0]);
  };

  const handleRegister = async (values: any) => {
    try {
      const data = await AuthService.register(values);
      if (data) {
        window.location.href = '/auth/login';
      }
    } catch (error: any) {
      console.error('Register failed:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Form
        form={form}
        scrollToFirstError
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        autoComplete="on"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: "600px",
          padding: "24px",
          paddingBlock: 32,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          validateStatus={usernameError ? "error" : ""}
          help={usernameError ? usernameError : ""}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateStatus={emailError ? "error" : ""}
          help={emailError ? emailError : ""}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Invalid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={passwordError ? "error" : ""}
          help={passwordError ? passwordError : ""}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirmed Password"
          name="password2"
          validateStatus={password2Error ? "error" : ""}
          help={password2Error ? password2Error : ""}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Admin Key"
          name="admin_key"
          validateStatus={adminKeyError ? "error" : ""}
          help={adminKeyError ? adminKeyError : ""}
          rules={[
            {
              required: true,
              message: "Please input your Admin key!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {errorMessage && 
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
            <Alert 
              message={errorMessage} 
              type="error" 
              showIcon 
              style={{
                width: "100%",
              }}
            />
        </Form.Item>}

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Sign up
          </Button>
        </Form.Item>
      
      </Form>
    </>
  );
};

export default RegisterForm;
