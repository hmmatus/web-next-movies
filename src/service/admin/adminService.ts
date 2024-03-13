import { GetUserResponseI, RegisterUserI } from "@/models/user.model";
import { service } from "../config";
import { userRoutes } from "./adminRoutes";

export const adminService = {
  getUser: (id: string): Promise<{user: GetUserResponseI}> => {
    return service.get(userRoutes.getUser(id));
  },
  registerUser: (data: RegisterUserI) => {
    return service.post(userRoutes.register(),data);
  }
};
