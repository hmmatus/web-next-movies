import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const authorization = cookies().get("jwt")
  const expiration = cookies().get("expiration")
  const diff =
    new Date().getTime() - new Date(expiration?.value ?? new Date()).getTime()

  if (diff > 0) {
    cookies().delete("jwt")
    cookies().delete("expiration")
  }
  if (
    request.nextUrl.pathname.startsWith("/admin/dashboard") &&
    !authorization
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  return NextResponse.next()
}
