import { type GetMovieResponseI } from "@/models/movie.model"
import { service } from "../config"
import { movieRoutes } from "./movieRoutes"
import { type GetMovieFilters } from "@/models/user.model"
import { type RcFile } from "antd/es/upload"
import { type AddMovieSchemaP } from "@/components/layouts/addMovie/validation"

export const movieService = {
  getMovies: async (
    data: Partial<GetMovieFilters>,
  ): Promise<GetMovieResponseI> => {
    return await service.get(movieRoutes.getMovies(data))
  },
  saveMovieImage: async (image: RcFile) => {
    const formData = new FormData()
    formData.append("file", image)
    return await service.post(movieRoutes.saveMovieImage(), formData, {
      "Content-Type": "multipart/form-data",
    })
  },
  addMovie: async (data: AddMovieSchemaP) => {
    return await service.post(movieRoutes.addMovie(), data)
  },
  deleteMovie: async (id: string) => {
    return await service.delete(movieRoutes.deleteMovie(id))
  },
  updateMovie: async (id: string, data: AddMovieSchemaP) => {
    return await service.put(movieRoutes.updateMovie(id), data)
  },
  likeMovie: async (data: { movieId: string; userId: string }) => {
    return await service.post(movieRoutes.likeMovie(), data)
  },
}
