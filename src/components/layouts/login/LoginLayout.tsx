"use client";
import { Button, Divider, Input, Select } from "antd";
import { useState } from "react";

type LoginLayoutP = {
  handleLogin(data: { email: string; password: string }): void;
  handleSignUp(): void;
  handleForgotPassword(): void;
  loading?: boolean;
};
const LoginLayout = ({
  handleLogin,
  handleSignUp,
  handleForgotPassword,
  loading = false,
}: LoginLayoutP) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (key: string, value: string) => {
    setLoginData({
      ...loginData,
      [key]: value,
    });
  };
  return (
    <main className="p-4 md:mx-auto flex flex-col items-center md:justify-center">
      <div className="p-4 md:bg-table-background-primary md:shadow-md md:max-w-screen-md md:rounded-md">
        <h1 className="mb-2">Login</h1>
        <Input
          size="large"
          placeholder="Email"
          value={loginData.email}
          onChange={(value) => handleOnChange("email", value.target.value)}
          disabled={loading}
        />
        <Input.Password
          size="large"
          className="my-4"
          placeholder="Password"
          value={loginData.password}
          onChange={(value) => handleOnChange("password", value.target.value)}
          disabled={loading}
        />
        <Button
          className="justify-self-end"
          type="link"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          Forgot your password?
        </Button>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            type="primary"
            onClick={() => handleLogin(loginData)}
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
          <Button onClick={handleSignUp} disabled={loading}>
            Sign in
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginLayout;
