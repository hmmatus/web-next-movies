"use client"

import { type MovieI } from "@/models/movie.model"
import { Breadcrumb, Button, Divider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { type ReactElement } from "react"

export default function Page(): ReactElement {
  const params = useSearchParams()
  const movie: MovieI = JSON.parse(params.get("movie") ?? "")
  const itemsBreadCrumb = [
    {
      title: (
        <Link className="color-black" href={"/"}>
          Home
        </Link>
      ),
      path: "/",
    },
    { title: `${movie.title}` },
  ]
  return (
    <main className="flex flex-col w-full p-4">
      <Breadcrumb items={itemsBreadCrumb} separator={">"} />
      <div className="flex flex-col md:flex-row w-full md:p-4">
        <section className="relative flex flex-1 max-w-[400px] min-h-[30rem] justify-center items-center">
          <Image src={movie.image} alt={`Logo ${movie.title}`} fill />
        </section>
        <section className="flex flex-1 max-w-[40rem] flex-col p-4 gap-2">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <Divider />
          <h1>Prices</h1>
          <div className="flex">
            <div className="flex flex-1">
              <h3>Rent: </h3>
              <p>{`${movie.rentAmount} $`}</p>
            </div>
            <div className="flex flex-1">
              <h3>Sale: </h3>
              <p>{`${movie.saleAmount} $`}</p>
            </div>
          </div>
          <Divider />
          <h1 className="mb-4">Options</h1>
          <div className="flex gap-2">
            <Button type="primary">Purchase</Button>
            <Button type="primary">Rent</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
