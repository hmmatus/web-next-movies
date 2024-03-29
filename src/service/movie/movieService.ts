import { MovieI } from "@/models/movie";
import { service } from "../config";
import { movieRoutes } from "./movieRoutes";
import { MovieFormI } from "@/components/layouts/admin/movie/AddMovie";

export const movieService = {
  addMovie: (cinemaId: string, data: MovieFormI) => {
    return service.post(movieRoutes.addMovie(cinemaId), {
      ...data
    })
  },
  uploadPicture: (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    return service.post(movieRoutes.uploadPicture(), formData, {
      'Content-Type': 'multipart/form-data'
    })
  },
  getMovies: (idCinema: string) => {
    return service.get(movieRoutes.getMovies(idCinema))
  },
  getMovieById: (idCinema: string, idMovie: string) => {
    return service.get(movieRoutes.getMovieById(idCinema, idMovie));
  },
  deleteMovie: (idCinema: string, idMovie: string) => {
    return service.delete(movieRoutes.deleteMovie(idCinema, idMovie));
  },
}