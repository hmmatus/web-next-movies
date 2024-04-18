"use client"
import MovieFormLayout from "@/components/layouts/addMovie/AddMovieLayout"
import { type AddMovieSchemaP } from "@/components/layouts/addMovie/validation"
import { type MovieI } from "@/models/movie.model"
import { movieService } from "@/service/movies/movieService"
import { useMutation } from "@tanstack/react-query"
import { notification } from "antd"
import { type RcFile } from "antd/es/upload"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, type ReactElement } from "react"

async function editQuery({
  id,
  data,
}: {
  id: string
  data: AddMovieSchemaP
}): Promise<void> {
  let formData = {
    ...data,
  }
  if (typeof data.image !== "string") {
    const result = await movieService.saveMovieImage(data.image as RcFile)
    formData = {
      ...formData,
      image: result.url,
    }
  }
  await movieService.updateMovie(id, formData)
}

function PageContent(): ReactElement {
  const params = useSearchParams()
  const movie: MovieI = JSON.parse(params.get("movie") ?? "")
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: editQuery,
    onSuccess: () => {
      notification.success({
        message: "Movie added successfully",
      })
      router.replace("/admin/dashboard/")
    },
    onError: (error) => {
      notification.error({
        message: "There was an error during register",
        description: `${error.message}`,
      })
    },
  })
  const MovieState: AddMovieSchemaP = {
    title: movie.title,
    description: movie.description,
    saleAmount: movie.saleAmount,
    rentAmount: movie.rentAmount,
    stock: movie.stock,
    image: movie.image,
    availability: movie.availability,
  }
  return (
    <MovieFormLayout
      movie={MovieState}
      loading={mutation.isPending}
      onAddMovie={(data: AddMovieSchemaP) => {
        mutation.mutate({ id: movie.id, data })
      }}
    />
  )
}

export default function Page(): JSX.Element {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}
