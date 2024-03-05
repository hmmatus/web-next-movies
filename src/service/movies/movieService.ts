import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { service } from "../config";
import { movieRoutes } from "./movieRoutes";

export const movieService = {
  getMovies: (): Promise<GetMovieResponseI> => {
    return service.get(movieRoutes.getMovies());
  },
};
