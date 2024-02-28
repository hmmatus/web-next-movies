import { CinemaI } from "@/models/cinema";
import { service } from "../config"
import { cinemaRoutes } from "./cinemaRoutes"
import { RegisterCinemaP } from "@/components/layouts/admin/cinema/RegisterCinemaLayout";

export const cinemaService = {
  getallCinemas: () => {
    return service.get(cinemaRoutes.getAllCinemas());
  },
  registerCinema: (data: RegisterCinemaP) => {
    return service.post(cinemaRoutes.register(),{...data});
  }
}