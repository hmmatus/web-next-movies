"use client";
import LoginLayout from "@/components/layouts/login/LoginLayout";
import { userService } from "@/service/user/userService";

async function loginRequest(data: { email: string; password: string }) {
  try {
    const { email, password } = data;
    const result = await userService.login({ email, password });
  } catch (error) {
    console.log("🚀 ~ loginRequest ~ error:", error);
  }
}
export default function AdminLogin() {
  return <LoginLayout role="admin" onLogin={loginRequest} />;
}
