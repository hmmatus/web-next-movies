"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import InputText from "@/components/elements/form/inputs/InputText/InputText";
import { app } from "@/firebase/config";
import { useAppDispatch } from "@/redux/hooks";
import { saveJwt } from "@/redux/slices/auth";
import { saveUser } from "@/redux/slices/user";
import { userService } from "@/service/user/userService";
import { axiosInstance } from "@/service/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRole } from "@/models/user";
type loginDataP = {
  email: string;
  password: string;
};

const AdminLoginLayout = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<loginDataP>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await result.user.getIdToken();
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      const userData = await userService.getUserData(result.user.uid);
      if (userData.user.role !== UserRole.admin) {
        throw new Error("User is not an admin");
      }
      dispatch(saveJwt({ jwt: token }));
      dispatch(
        saveUser({
          user: {
            id: result.user.uid,
            ...userData.user
          },
        })
      );
      router.push("/admin/home");
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCinemaRegister = () => {
    router.push("/admin/addCinema");
  }

  function onChangeValue(index: string, value: string) {
    setData({ ...data, [index]: value });
  }
  return (
    <main>
      <div className={`w-full flex items-center justify-center`}>
        <div className="w-80 flex flex-col items-center justify-center">
          <h1 className="text-2xl text-bold my-2">Admin Login</h1>
          <InputText
            title="Email"
            name="email"
            value={data?.email}
            inputProps={{
              className: "w-full",
              disabled: loading,
            }}
            onChange={(value) => onChangeValue("email", value)}
          />
          <InputText
            title="Password"
            name="password"
            type="password"
            value={data?.password}
            onChange={(value) => onChangeValue("password", value)}
            inputProps={{
              className: "w-full",
              disabled: loading,
            }}
          />
          <Link className="text-primary mb-4" href="/admin/signup">
            Dont you have an account? Sign Up
          </Link>
          <MainButton
            type="button"
            title="Login"
            className="w-full mx-2"
            onClick={handleLogin}
          />
          <MainButton
            type="button"
            title="Register a cinema"
            className="w-full mx-2 mt-2"
            onClick={handleCinemaRegister}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminLoginLayout;
