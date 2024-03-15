"use client"
import React from "react"
import AddMovieLayout from "@/components/layouts/addMovie/AddMovieLayout"
import { movieService } from "@/service/movies/movieService"
import { useMutation } from "@tanstack/react-query"
import { notification } from "antd"
import { useRouter } from "next/navigation"
import { type ReactElement } from "react"
import { type AddMovieSchemaP } from "@/components/layouts/addMovie/validation"
import { type RcFile } from "antd/es/upload"

async function addMovieQuery(data: AddMovieSchemaP): Promise<void> {
  const url = await movieService.saveMovieImage(data.image as RcFile)
  await movieService.addMovie({
    image: url,
    title: data.title,
    description: data.description,
    availability: data.availability,
    rentAmount: data.rentAmount,
    saleAmount: data.saleAmount,
    stock: data.stock,
  })
}

export default function Page(): ReactElement {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: addMovieQuery,
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

  return (
    <AddMovieLayout
      onAddMovie={(data: AddMovieSchemaP) => {
        mutation.mutate(data)
      }}
      loading={mutation.isPending}
    />
  )
}
