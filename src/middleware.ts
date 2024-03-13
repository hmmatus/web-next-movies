import { axiosInstance } from "@/service/config";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  if (request.url.includes("/admin/dashboard") && axiosInstance.defaults.headers.common["Authorization"] === "") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
