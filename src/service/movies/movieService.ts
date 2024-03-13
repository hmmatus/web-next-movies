import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { service } from "../config";
import { movieRoutes } from "./movieRoutes";
import { GetMovieFilters } from "@/models/user.model";

export const movieService = {
  getMovies: (data: Partial<GetMovieFilters>): Promise<GetMovieResponseI> => {
    return service.get(movieRoutes.getMovies(data));
  },
};
