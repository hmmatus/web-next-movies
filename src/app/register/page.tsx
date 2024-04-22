"use client"
import React, { type ReactElement } from "react"
import RegisterLayout from "@/components/layouts/register/RegisterLayout"
import { type UserI, type RegisterUserI, UserRole } from "@/models/user.model"
import { useMutation } from "@tanstack/react-query"
import { userService } from "@/service/user/userService"
import { notification } from "antd"
import { useRouter } from "next/navigation"
async function registerQuery(data: RegisterUserI): Promise<UserI> {
  const result = await userService.registerUser({
    ...data,
    role: UserRole.user,
  })
  return result
}
export default function Page(): ReactElement {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: registerQuery,
    onSuccess: () => {
      notification.success({
        message: "User created successfully",
      })
      router.replace("/login")
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
