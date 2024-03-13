import { GetMovieFilters } from "@/models/user.model";

const BASE_URL = "/movies";
const getMovies = (data: Partial<GetMovieFilters>) =>
  `${BASE_URL}/?currentPage=${data.currentPage}&limit=${data.limit}${data?.searchValue ? `&searchValue=${data.searchValue}`: ""}${data?.orderBy ? `&orderBy=${data.orderBy}` : ""}${data?.onlyAvailable ? `&onlyAvailable=${data.onlyAvailable}`: ""}`;
export const movieRoutes = {
  getMovies: (data: Partial<GetMovieFilters>) => getMovies(data),
};
