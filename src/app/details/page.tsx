"use client"

import { CheckoutMovieEnum, type MovieI } from "@/models/movie.model"
import { useAppSelector } from "@/redux/hooks"
import { Breadcrumb, Button, Divider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, type ReactElement } from "react"

function PageContent(): ReactElement {
  const params = useSearchParams()
  const movie: MovieI = JSON.parse(params.get("movie") ?? "")
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
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
  const handlePurchase = (type: CheckoutMovieEnum): void => {
    const params = new URLSearchParams()
    params.set("movie", JSON.stringify(movie))
    params.set("type", type)
    router.push(`/checkout/?${params.toString()}`)
  }
  return (
    <main className="flex flex-col w-full p-4">
      <Breadcrumb items={itemsBreadCrumb} separator={">"} />
      <div className="flex flex-col md:flex-row w-full md:p-4 mt-4">
        <section className="relative flex flex-1 max-w-[400px] min-h-[30rem] justify-center items-center">
          <Image src={movie.image} alt={`Logo ${movie.title}`} fill />
        </section>
        <section className="flex flex-1 max-w-[40rem] flex-col p-4 gap-2">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <Divider />
          <h1>Prices</h1>
          <div className="flex gap-2">
            <h3>Stock available:</h3>
            <p>{`${movie.stock}`}</p>
          </div>
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
          {!isLoggedIn && (
            <p className="mt-4">
              Log In if you want to have access to more features
            </p>
          )}
          <div className={`${isLoggedIn ? "flex" : "hidden"} gap-2`}>
            <Button
              type="primary"
              onClick={() => {
                handlePurchase(CheckoutMovieEnum.SALE)
              }}
            >
              Purchase
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handlePurchase(CheckoutMovieEnum.RENT)
              }}
            >
              Rent
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function Page(): ReactElement {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}
