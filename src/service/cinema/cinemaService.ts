import { service } from "../config"
import { cinemaRoutes } from "./cinemaRoutes"

export const cinemaService = {
  getallCinemas: () => {
    return service.get(cinemaRoutes.getAllCinemas());
  }
}