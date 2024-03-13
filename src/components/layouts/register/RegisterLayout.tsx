"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUserSchema } from "./validation";
import InputText from "@/components/elements/form/inputs/inputText/InputText";
import { Button } from "antd";
import * as yup from "yup";
import { RegisterUserI } from "@/models/user.model";
import InputPassword from "@/components/elements/form/inputs/inputPassword/InputPassword";

type RegisterLayoutP = {
  onRegister(data: RegisterUserI): void;
  loading: boolean;
};
const RegisterLayout = ({ onRegister, loading }: RegisterLayoutP) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerUserSchema),
  });
  const onSubmit: SubmitHandler<yup.InferType<typeof registerUserSchema>> = (
    data
  ) =>
    onRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  return (
    <main className="p-4 md:mx-auto flex flex-col items-center md:justify-center">
      <div className="p-4 md:bg-table-background-primary md:shadow-md md:max-w-screen-md w-full md:rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Name"
            name="name"
            errorMessage={errors.name?.message || ""}
            control={control}
            disabled={loading}
          />
          <InputText
            label="Email"
            name="email"
            errorMessage={errors.email?.message || ""}
            control={control}
            disabled={loading}
          />
          <InputPassword
            label="Password"
            name="password"
            errorMessage={errors.password?.message || ""}
            control={control}
            disabled={loading}
          />
          <InputPassword
            label="Confirm password"
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message || ""}
            control={control}
            disabled={loading}
          />
          <Button
            loading={loading}
            disabled={loading}
            className="mt-4"
            type="primary"
            htmlType="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
    </main>
  );
};

export default RegisterLayout;
