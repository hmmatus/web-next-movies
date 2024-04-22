"use client"
import React, { type ReactElement } from "react"
import RegisterLayout from "@/components/layouts/register/RegisterLayout"
import { type RegisterUserI, UserRole } from "@/models/user.model"
import { useMutation } from "@tanstack/react-query"
import { notification } from "antd"
import { useRouter } from "next/navigation"
import { adminService } from "@/service/admin/adminService"

async function registerQuery(data: RegisterUserI): Promise<void> {
  await adminService.registerUser({
    ...data,
    role: UserRole.admin,
  })
}
export default function Page(): ReactElement {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: registerQuery,
    onSuccess: () => {
      notification.success({
        message: "User created successfully",
      })
      router.replace("/admin/login")
    },
    onError: (error) => {
      notification.error({
        message: "There was an error during register",
        description: `${error.message}`,
      })
    },
  })
  return (
    <RegisterLayout
      loading={mutation.isPending}
      onRegister={(data) => {
        mutation.mutate(data)
      }}
    />
  )
}
