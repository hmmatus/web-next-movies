const BASE_URL = "/cinemas";
const getAllCinemas = () => `${BASE_URL}`;
const register = () => `${BASE_URL}`;

export const cinemaRoutes = {
  getAllCinemas:() => getAllCinemas(),
  register:() => register(),
};