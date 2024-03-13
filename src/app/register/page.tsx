"use client"
import RegisterLayout from "@/components/layouts/register/RegisterLayout";
import { RegisterUserI } from "@/models/user.model";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/service/user/userService";
import { notification } from "antd";
import { useRouter } from "next/navigation";
async function registerQuery(data: RegisterUserI) {
  const result = await userService.registerUser({
    ...data,
    role: "user"
  });
  return result;
}
export default function Page() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerQuery,
    onSuccess: (result) => {
      notification.success({
        message: "User created successfully",
      });
      router.replace("/login");
    },
    onError: (error) => {
      notification.error({
        message: "There was an error during register",
        description: `${(error as Error).message}`,
      });
    },
  });
  return (
    <RegisterLayout
      loading={mutation.isPending}
      onRegister={(data) => mutation.mutate(data)}
    />
  );
}