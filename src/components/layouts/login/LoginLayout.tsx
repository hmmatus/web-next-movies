"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import InputSelect, { OptionsP } from "@/components/elements/form/inputs/InputSelect/InputSelect";
import InputText from "@/components/elements/form/inputs/InputText/InputText";

import Link from "next/link";
import { useState } from "react";
type loginDataP = {
  email: string;
  password: string;
};

const LoginLayout = () => {
  const [data, setData] = useState<loginDataP>({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    
  };

  function onChangeValue(index: string, value: string) {
    setData({ ...data, [index]: value });
  }
  return (
    <main>
      <div className={`w-full flex items-center justify-center`}>
        <div className="w-80 flex flex-col items-center justify-center">
          <h1 className="text-2xl text-bold my-2">Login</h1>
          <InputText
            title="Email"
            name="email"
            value={data?.email}
            inputProps={{
              className: "w-full",
            }}
            onChange={(value) => onChangeValue("email", value)}
          />
          <InputText
            title="Password"
            name="password"
            value={data?.password}
            onChange={(value) => onChangeValue("password", value)}
          />
          <Link
            className="text-primary mb-4"
            href="/signup"
          >
            Dont you have an account? Sign Up
          </Link>
          <MainButton
            type="button"
            title="Login"
            className="w-full mx-2"
            onClick={handleLogin}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginLayout;
