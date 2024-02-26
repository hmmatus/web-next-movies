"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import InputText from "@/components/elements/form/inputs/InputText/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { signupSchema } from "./validation";

import { SignUpUserI, UserI, UserRole } from "@/models/user";
import { CinemaI } from "@/models/cinema";
import { userService } from "@/service/user/userService";
import { cinemaService } from "@/service/cinema/cinemaService";

const SignUpLayout = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onRegister = async (data: SignUpUserI) => {
    setLoading(true);
    try {
      const result = await userService.signUp({
        name: data.name,
        email: data.email,
        cinemaId: data.cinemaId,
        password: data.password,
        role: UserRole.customer,
      });
      console.log(result);
    } catch (error) {
      console.log(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignUpUserI> = (data) => {
    onRegister(data);
  };

  return (
    <main>
      <div className={`flex w-100 flex-col items-center justify-center `}>
        <h1 className="text-2xl text-bold my-4"> Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Name"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.name?.message}
                inputProps={{ disabled: loading }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Email"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.email?.message}
                inputProps={{ disabled: loading }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Password"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.password?.message}
                inputProps={{ disabled: loading }}
                type="password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Confirm password"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.confirmPassword?.message}
                inputProps={{ disabled: loading }}
                type="password"
              />
            )}
          />

          <MainButton className="w-full mt-4" type="submit" title="Send" />
        </form>
      </div>
    </main>
  );
};

export default SignUpLayout;
