"use client"
import AddMovieLayout from "@/components/layouts/addMovie/AddMovieLayout";
import { MovieI } from "@/models/movie.model";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/navigation";

async function addMovieQuery(data: MovieI) {
  console.log(data);
}

export default function Page() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: addMovieQuery,
    onSuccess: (result) => {
      notification.success({
        message: "Movie added successfully",
      });
      router.replace("/admin/dashboard/");
    },
    onError: (error) => {
      notification.error({
        message: "There was an error during register",
        description: `${(error as Error).message}`,
      });
    },
  });

  return (
    <AddMovieLayout
      onAddMovie={(data) => mutation.mutate(data)}
      loading={mutation.isPending}
    />
  );
}
