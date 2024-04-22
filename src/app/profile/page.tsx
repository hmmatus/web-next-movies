"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Avatar, Button, Flex, notification } from "antd"
import { type ReactElement } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/contexts/UserProvider"
import { removeJwt } from "@/redux/slices/auth"
import { removeUser } from "@/redux/slices/user"

export default function Page(): ReactElement {
  const { name, email } = useAppSelector((state) => state.user)
  const router = useRouter()
  const dispatch = useAppDispatch()
  async function onLogout(): Promise<void> {
    dispatch(removeJwt())
    dispatch(removeUser())
    await logout()
    notification.success({
      message: "Logout successfully",
      placement: "topRight",
    })
    router.replace("/")
  }
  return (
    <main className="flex flex-col items-center justify-center mt-4">
      <section className="flex flex-col gap-2 md:w-[50vw]">
        <Avatar className="self-center" size={120}>
          <h1>{name[0]}</h1>
        </Avatar>
        <Flex className="items-center justify-between">
          <h2>Name: </h2>
          <p>{name}</p>
        </Flex>
        <Flex className="items-center justify-between">
          <h2>Email: </h2>
          <p>{email}</p>
        </Flex>
        <Button className=" self-center" type="primary" onClick={onLogout}>
          Logout
        </Button>
      </section>
    </main>
  )
}
