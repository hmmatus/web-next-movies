const BASE_URL = "/cinemas";
const uploadPicture = () =>
  `${BASE_URL}/movies/picture`;
  const addMovie = (cinemaId: string) => `${BASE_URL}/${cinemaId}/movies/`;
  const getMovies = (cinemaId: string) => `${BASE_URL}/${cinemaId}/movies/`;
export const movieRoutes = {
  uploadPicture: () => uploadPicture(),
  addMovie: (cinemaId: string) => addMovie(cinemaId),
  getMovies: (cinemaId: string) => getMovies(cinemaId)
};
