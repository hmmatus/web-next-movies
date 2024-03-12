"use client";

import MovieCard from "@/components/elements/cards/Movie/MovieCard";
import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { UserRole } from "@/models/user.model";
import { movieService } from "@/service/movies/movieService";
import { useQuery } from "@tanstack/react-query";
import { Input, Select, Space } from "antd";
import { SearchProps } from "antd/es/input";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

const { Search } = Input;
const options = [
  { label: "Default", value: "" },
  {
    label: "Likes",
    value: "likes",
  },
];
async function getMoviesData(): Promise<GetMovieResponseI> {
  const result = await movieService.getMovies();
  return result;
}

export default function Page() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["moviesData"],
    queryFn: getMoviesData,
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onChangeSelect = (value: string) => {
    setSelectedValue;
  };
  return (
    <Space direction="vertical" className="p-4">
      <div className="flex flex-col md:flex-row gap-2 lg:max-w-screen-md">
        <Search
          size="large"
          placeholder="input search text"
          onChange={onChangeSearch}
          onSearch={onSearch}
          value={searchValue}
        />
        <Select style={{width: 200}} onChange={onChangeSelect} options={options} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        {data?.data.map((movie: MovieI) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            loading={isLoading}
            userRole={UserRole.user}
            isLoggedIn
          />
        ))}
      </div>
    </Space>
  );
}
