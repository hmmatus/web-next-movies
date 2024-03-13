"use client"
import LoginLayout from "@/components/layouts/login/LoginLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/firebase/config";
import { axiosInstance } from "@/service/config";
import { adminService } from "@/service/admin/adminService";
import { UserRole } from "@/models/user.model";
import { useAppDispatch } from "@/redux/hooks";
import { notification } from "antd";
import { saveJwt } from "@/redux/slices/auth";
import { saveUser } from "@/redux/slices/user";
import { useRouter } from "next/navigation";

async function loginQuery(data: { email: string; password: string }) {
  const auth = getAuth(firebaseApp);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const idToken = await userCredential.user.getIdToken();
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
  const result = await adminService.getUser(userCredential.user.uid);
  if (result.user.role !== UserRole.admin) {
    axiosInstance.defaults.headers.common["Authorization"] = ``;
    throw new Error("This user is not an admin");
  }
  return {
    jwt: idToken,
    user: result.user,
  };
}

export default function Page(){
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: (data) => {
      dispatch(
        saveJwt({
          jwt: data.jwt,
        })
      );
      dispatch(saveUser({ user: data.user }));
      notification.success({
        message: `Login successfully`,
        placement: "topRight",
      });
      router.replace("/admin/dashboard");
    },
    onError: (error) => {
      let errorMessage = "";
      if ((error as Error).message.includes("invalid-credential")) {
        errorMessage = "Invalid Credentials";
      } else {
        errorMessage = (error as Error).message;
      }
      notification.error({
        message: `${errorMessage}`,
        placement: "topRight",
      });
    },
  });
  return (
    <LoginLayout handleLogin={(data) => mutation.mutate(data)} handleSignUp={() => router.push('/admin/register')} loading={mutation.isPending} handleForgotPassword={() => router.push('/forgot')} />
  )
}