"use client";
import LoginLayout from "@/components/layouts/login/LoginLayout";
import { useAppDispatch } from "@/redux/hooks";
import { saveJwt } from "@/redux/slices/auth";
import { axiosInstance } from "@/service/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebaseApp from "@/firebase/config"; 

async function loginQuery(data: { email: string; password: string }) {
  const auth = getAuth(firebaseApp);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const idToken = userCredential.user.getIdToken();
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
  return idToken
}

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: (token) => {
      dispatch(
        saveJwt({
          jwt: token,
        })
      );
      notification.success({
        message: `Login successfully`,
        placement: "topRight",
      });
    },
    onError: (error) => {
      let errorMessage="";
      if ((error as Error).message.includes("invalid-credential")) {
        errorMessage = "Invalid Credentials"
      } else {
        errorMessage = (error as Error).message;
      }
    notification.error({
      message: `${errorMessage}`,
      placement: "topRight"
    })

    }
  });

  return (
    <LoginLayout
      loading={mutation.isPending}
      handleSignIn={() => router.push("/signIn")}
      handleForgotPassword={() => router.push("/forgot")}
      handleLogin={(data) => {
        console.log("🚀 ~ Page ~ data:", data)
        mutation.mutate(data)
      }}
    />
  );
}
