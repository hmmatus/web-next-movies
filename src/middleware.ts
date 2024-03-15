import { axiosInstance } from "@/service/config"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest): Promise<void> {
  if (
    request.url.includes("/admin/dashboard") &&
    axiosInstance.defaults.headers.common.Authorization === ""
  ) {
    NextResponse.redirect(new URL("/", request.url))
  } else {
    NextResponse.next()
  }
}
