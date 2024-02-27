"use client";
import LoadingComponent from "@/components/layouts/loading/LoadingLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
  return <LoadingComponent />;
}
