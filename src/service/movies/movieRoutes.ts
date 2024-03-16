import { type GetMovieFilters } from "@/models/user.model"

const BASE_URL = "/movies"
const getMovies = (data: Partial<GetMovieFilters>): string =>
  `${BASE_URL}/?currentPage=${data.currentPage}&limit=${data.limit}${data?.searchValue ? `&searchValue=${data.searchValue}` : ""}${data?.orderBy != null ? `&orderBy=${data.orderBy}` : ""}${
    data?.onlyAvailable ?? false ? `&onlyAvailable=${data.onlyAvailable}` : ""
  }`
const saveMovieImage = (): string => `${BASE_URL}/picture`
const addMovie = (): string => `${BASE_URL}`
const deleteMovie = (id: string): string => `${BASE_URL}/${id}`
const updateMovie = (id: string): string => `${BASE_URL}/${id}`
export const movieRoutes = {
  getMovies: (data: Partial<GetMovieFilters>) => getMovies(data),
  saveMovieImage: () => saveMovieImage(),
  addMovie: () => addMovie(),
  deleteMovie: (id: string) => deleteMovie(id),
  updateMovie: (id: string) => updateMovie(id),
}
