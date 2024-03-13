"use client";

import MovieCard from "@/components/elements/cards/Movie/MovieCard";
import LoadingLayout from "@/components/layouts/loading/LoadingLayout";
import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { GetMovieFilters, UserRole } from "@/models/user.model";
import { useAppSelector } from "@/redux/hooks";
import { movieService } from "@/service/movies/movieService";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination, Select, Space } from "antd";
import { SearchProps } from "antd/es/input";
import { ChangeEvent, useEffect, useState } from "react";

const { Search } = Input;

type OptionT = {
  label: string;
  value: "default" | "likes";
};
const options: OptionT[] = [
  { label: "Default", value: "default" },
  {
    label: "Likes",
    value: "likes",
  },
];
async function getMoviesData(
  data: Partial<GetMovieFilters>
): Promise<GetMovieResponseI> {
  const result = await movieService.getMovies(data);
  return result;
}

export default function Page() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<"default" | "likes">(
    "default"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["moviesData"],
    queryFn: () =>
      getMoviesData({
        onlyAvailable: true,
        orderBy: selectedValue,
        searchValue,
        currentPage: currentPage,
        limit: 3,
      }),
    retry: 2,
    enabled: true,
  });
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setCurrentPage(1);
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onChangeSelect = (value: "default" | "likes") => {
    setSelectedValue(value);
  };
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [selectedValue, currentPage, onSearch]);

  if (isLoading) {
    return <LoadingLayout />;
  }

  return (
    <Space direction="vertical" className="p-4 w-full">
      <div className="flex flex-col md:flex-row gap-2 lg:max-w-screen-md">
        <Search
          placeholder="Search text"
          onChange={onChangeSearch}
          onSearch={onSearch}
          value={searchValue}
        />
        <Select
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
            userRole={UserRole.user}
            isLoggedIn={isLoggedIn}
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
  );
}
