"use server"
import { type UserRole } from "@/models/user.model"
import { cookies } from "next/headers"

interface SessionObjT {
  jwt: string
  expiration: Date
  userRole: UserRole
  id: string
}

export async function createSession(data: SessionObjT): Promise<void> {
  cookies().set(
    "session",
    JSON.stringify({ jwt: data.jwt, userRole: data.userRole, id: data.id }),
    {
      expires: data.expiration,
    },
  )
}

export async function deleteSession(): Promise<void> {
  cookies().set("session", "", { expires: new Date(0) })
}

export async function getSession(): Promise<SessionObjT | null> {
  const session = cookies().get("session")?.value
  return session ? JSON.parse(session) : null
}
