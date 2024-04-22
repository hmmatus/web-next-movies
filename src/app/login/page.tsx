"use client"
import React from "react"
import LoginLayout from "@/components/layouts/login/LoginLayout"
import { useMutation } from "@tanstack/react-query"
import { notification } from "antd"
import { useRouter } from "next/navigation"
import { UserRole } from "@/models/user.model"
import { type ReactElement } from "react"
import { login } from "@/contexts/UserProvider"
import { useAppDispatch } from "@/redux/hooks"
import { saveJwt } from "@/redux/slices/auth"
import { saveUser } from "@/redux/slices/user"

export default function Page(): ReactElement {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      notification.success({
        message: "Login successfully",
        placement: "topRight",
      })
      dispatch(saveJwt({ jwt: data?.jwt ?? "" }))
      dispatch(
        saveUser({
          user: data?.user ?? {
            id: "",
            name: "",
            email: "",
            role: UserRole.user,
          },
        }),
      )
      router.replace("/")
    },
    onError: (error) => {
      let errorMessage = ""
      if (error.message.includes("invalid-credential")) {
        errorMessage = "Invalid Credentials"
      } else {
        errorMessage = error.message
      }
      notification.error({
        message: `${errorMessage}`,
        placement: "topRight",
      })
    },
  })

  return (
    <LoginLayout
      loading={mutation.isPending}
      handleSignUp={() => {
        router.push("/register")
      }}
      handleForgotPassword={() => {
        router.push("/forgot")
      }}
      handleLogin={(data) => {
        mutation.mutate({ ...data, role: UserRole.user })
      }}
    />
  )
}
