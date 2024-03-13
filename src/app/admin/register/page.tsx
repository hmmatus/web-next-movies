"use client"
import RegisterLayout from "@/components/layouts/register/RegisterLayout";
import { RegisterUserI, UserRole } from "@/models/user.model";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/service/user/userService";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { adminService } from "@/service/admin/adminService";
async function registerQuery(data: RegisterUserI) {
  const result = await adminService.registerUser({
    ...data,
    role: UserRole.admin
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
      router.replace("/admin/login");
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
