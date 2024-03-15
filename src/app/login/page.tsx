"use client"
import React from "react"
import LoginLayout from "@/components/layouts/login/LoginLayout"
import { useAppDispatch } from "@/redux/hooks"
import { saveJwt } from "@/redux/slices/auth"
import { axiosInstance } from "@/service/config"
import { useMutation } from "@tanstack/react-query"
import { notification } from "antd"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import firebaseApp from "@/firebase/config"
import { userService } from "@/service/user/userService"
import { saveUser } from "@/redux/slices/user"
import { type UserI } from "@/models/user.model"
import { type ReactElement } from "react"

interface LoginAdminQuery {
  jwt: string
  user: UserI
}
async function loginQuery(data: {
  email: string
  password: string
}): Promise<LoginAdminQuery> {
  const auth = getAuth(firebaseApp)
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  const idToken = await userCredential.user.getIdToken()
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${idToken}`
  const result = await userService.getUser(userCredential.user.uid)
  return {
    jwt: idToken,
    user: result.user,
  }
}

export default function Page(): ReactElement {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const mutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: (data) => {
      dispatch(
        saveJwt({
          jwt: data.jwt,
        }),
      )
      dispatch(saveUser({ user: data.user }))
      notification.success({
        message: "Login successfully",
        placement: "topRight",
      })
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
        mutation.mutate(data)
      }}
    />
  )
}
