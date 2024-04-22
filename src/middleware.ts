import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "../lib"
import { UserRole } from "./models/user.model"

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const isAdminUrl = request.nextUrl.pathname.startsWith("/admin/dashboard")
  const savedSession = await getSession()
  const isLoggedInAdmin =
    isAdminUrl && savedSession?.userRole === UserRole.admin

  if (isAdminUrl && !isLoggedInAdmin) {
    NextResponse.redirect("/admin/login")
  }
  return NextResponse.next()
}
