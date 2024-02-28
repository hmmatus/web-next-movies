"use client";
import MoviesLayout from "@/components/layouts/movies/MoviesLayout";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function PageContent() {
  const { id } = useAppSelector((state) => state.cinema);
  const router = useRouter();
  useEffect(() => {
    if (!(!!id)) {
      router.replace('/')
    }
  }, []);
  return <MoviesLayout />;
}

export default function Page() {
  return <PageContent />;
}
