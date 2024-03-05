"use client";

import MovieCard from "@/components/elements/cards/Movie/MovieCard";
import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { UserRole } from "@/models/user.model";
import { movieService } from "@/service/movies/movieService";
import { useQuery } from "@tanstack/react-query";
import { Flex, Grid } from "antd";

async function getMoviesData(): Promise<GetMovieResponseI> {
  const result = await movieService.getMovies();
  return result;
}

export default function Page() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["moviesData"],
    queryFn: getMoviesData,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
}
