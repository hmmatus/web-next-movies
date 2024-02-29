"use client";
import { UserRole } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  userRoles: UserRole[];
};
const ProtectedRoute = ({ children, userRoles }: Props) => {
  const { isLoggedIn, jwt } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn && !!!jwt) {
      // Redirect to the login page if the user is not authenticated
      router.push(
        `/${userRoles.includes(UserRole.admin) ? "admin/" : ""}login`
      );
    }
  }, [isLoggedIn, , jwt, router, userRoles]);

  return <>{children}</>;
};

export default ProtectedRoute;
