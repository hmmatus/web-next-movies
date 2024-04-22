"use server"

import { cookies } from "next/headers"

interface StoreTokenRequestI {
  jwt: string
  expiration: Date
}
export async function storeToken(request: StoreTokenRequestI): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set({
    name: "accessToken",
    value: request.jwt,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  })
  cookieStore.set({
    name: "expiration",
    value: request.expiration.toString(),
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  })
}
