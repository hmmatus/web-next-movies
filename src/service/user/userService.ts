import { GetUserResponseI } from "@/models/user.model";
import { service } from "../config";
import { userRoutes } from "./userRoutes";

export const userService = {
  getUser: (id: string): Promise<{user: GetUserResponseI}> => {
    return service.get(userRoutes.getUser(id));
  },
};
