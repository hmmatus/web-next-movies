"use client";
import MovieCard from "@/components/elements/cards/movie/MovieCard";
import InputSelect, {
  OptionsP,
} from "@/components/elements/form/inputs/InputSelect/InputSelect";
import SearchInput from "@/components/elements/inputs/searchInput/SearchInput";
import { MovieI } from "@/models/movie";
import { useAppSelector } from "@/redux/hooks";
import { movieService } from "@/service/movie/movieService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const options: OptionsP[] = [
  { name: "Latest", value: "" },
  { name: "Most liked", value: "likes" },
];
const MoviesLayout = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { id: cinemaId } = useAppSelector((state) => state.cinema);
  const router = useRouter();

  const getMovies = async () => {
    setLoading(true);
    try {
      const result = await movieService.getMovies(cinemaId);
      setMovies(result.data);
    } catch (error) {
      toast.error("There was an error, try later");
    }
  };
  const moveToDetails = (idMovie: string) => {
    const params = new URLSearchParams();
    params.set("idCinema", cinemaId);
    params.set("idMovie", idMovie);
    router.push(`/detail?${params.toString()}`);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <main className="p-4">
      <div className="flex items-center justify-center">
        <SearchInput
          onBlur={() => {}}
          value={searchValue}
          handleOnChange={(value) => setSearchValue(value)}
        />
        <div className="flex items-center justify-center w-40 ml-4">
          <InputSelect
            name="Filter"
            title=""
            value={selectedOption}
            options={options}
            onChange={(value) => setSelectedOption(value)}
          />
        </div>
      </div>
      <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie: MovieI) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => moveToDetails(movie.id)}
            isLiked
            onPressLike={() => {}}
          />
        ))}
      </div>
    </main>
  );
};

export default MoviesLayout;
