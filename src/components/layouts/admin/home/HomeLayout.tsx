"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import MovieCard from "@/components/elements/cards/movie/MovieCard";
import { MovieI } from "@/models/movie";
import { useAppSelector } from "@/redux/hooks";
import { movieService } from "@/service/movie/movieService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../../loading/LoadingLayout";

const AdminHomeLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { idCinema } = useAppSelector((state) => state.user);
  const [movies, setMovies] = useState<MovieI[]>([]);
  const handleAddMovie = () => {
    router.push("/admin/addMovie");
  };
  async function getMovies(idCinema: string) {
    setLoading(true);
    try {
      const result = await movieService.getMovies(idCinema);
      setMovies(result.data);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  const moveToDetails = (idMovie: string) => {
    const params = new URLSearchParams();
    params.set("idCinema", idCinema);
    params.set("idMovie", idMovie);
    router.push(`/admin/movie/detail?${params.toString()}`);
  };
  useEffect(() => {
    getMovies(idCinema);
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <MainButton title="Add movie" onClick={handleAddMovie} />
        <div className="grid gap-2 lg:grid-cols-4">
          {movies.map((movie: MovieI) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => moveToDetails(movie.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminHomeLayout;
