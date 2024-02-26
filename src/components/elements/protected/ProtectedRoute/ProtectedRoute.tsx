"use client";
import { UserRole } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  userRoles: UserRole[];
};
const ProtectedRoute = ({ children, userRoles }: Props) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    redirect(`/${userRoles.includes(UserRole.admin) ? "admin/" : ""}login`);
  }

  return <>{children}</>;
};

export default ProtectedRoute;
