"use client"

import MovieCard from "@/components/elements/cards/Movie/MovieCard"
import LoadingLayout from "@/components/layouts/loading/LoadingLayout"
import { useMovieDislike, useMovieLike, useMoviesData } from "@/hooks/movies"
import { type MovieI } from "@/models/movie.model"
import { useAppSelector } from "@/redux/hooks"
import { Input, Pagination, Select, Space } from "antd"
import { type SearchProps } from "antd/es/input"
import React, {
  type ChangeEvent,
  useEffect,
  useState,
  type ReactElement,
} from "react"

const { Search } = Input

interface OptionT {
  label: string
  value: "default" | "likes",
  disabled?: boolean
}

export default function Page(): ReactElement {
  const [searchValue, setSearchValue] = useState("")
  const [selectedValue, setSelectedValue] = useState<"default" | "likes">(
    "default",
  )
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const { id: userId } = useAppSelector((state) => state.user)
  const { data, isLoading, refetch } = useMoviesData({
    onlyAvailable: true,
    orderBy: selectedValue,
    searchValue,
    currentPage,
    limit: 10,
  })
  const movieLike = useMovieLike(refetch)
  const movieDislike = useMovieDislike(refetch)
  const options: OptionT[] = [
    { label: "Default", value: "default" },
    {
      label: "Likes",
      value: "likes",
      disabled: !userId,
    },
  ]
  const onSearch: SearchProps["onSearch"] = () => {
    setCurrentPage(1)
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }
  const onChangeSelect = (value: "default" | "likes"): void => {
    setSelectedValue(value)
  }
  const onChangePage = (page: number): void => {
    setCurrentPage(page)
  }

  useEffect(() => {
    void refetch()
  }, [selectedValue, currentPage, onSearch])

  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <Space direction="vertical" className="p-4 w-full">
      <div className="flex flex-col md:flex-row gap-2 lg:max-w-screen-md">
        <Search
          size="large"
          placeholder="Search text"
          onChange={onChangeSearch}
          onSearch={onSearch}
          value={searchValue}
        />
        <Select
          size="large"
          defaultValue={options[0].value}
          style={{ width: 200 }}
          onChange={onChangeSelect}
          options={options}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center justify-center">
        {data?.data.map((movie: MovieI) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            loading={isLoading}
            isLoggedIn={isLoggedIn}
            onPressLike={() => {
              movie.isMovieLiked ?? false
                ? movieDislike.mutate({ movieId: movie.id, userId })
                : movieLike.mutate({ movieId: movie.id, userId })
            }}
          />
        ))}
      </div>
      <Pagination
        defaultCurrent={1}
        current={data?.currentPage}
        total={data?.pages}
        onChange={onChangePage}
        responsive
      />
    </Space>
  )
}
