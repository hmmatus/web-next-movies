import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { service } from "../config";
import { movieRoutes } from "./movieRoutes";
import { GetMovieFilters } from "@/models/user.model";

export const movieService = {
  getMovies: (data: Partial<GetMovieFilters>): Promise<GetMovieResponseI> => {
    return service.get(movieRoutes.getMovies(data));
  },
  saveMovieImage: (image) => {
    console.log("🚀 ~ image:", image)
    const formData = new FormData();
    formData.append("file", image);
    return service.post(movieRoutes.saveMovieImage(), formData, {
      'Content-Type': 'multipart/form-data'
    });
  },
  addMovie: (data: MovieI) => {
    return service.post(movieRoutes.addMovie(), data);
  }
};
