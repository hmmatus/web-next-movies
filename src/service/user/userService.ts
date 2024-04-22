import { type GetUserResponseI, type RegisterUserI } from "@/models/user.model"
import { service } from "../config"
import { userRoutes } from "./userRoutes"

export const userService = {
  getUser: async (id: string): Promise<{ user: GetUserResponseI }> => {
    return await service.get(userRoutes.getUser(id))
  },
  registerUser: async (data: RegisterUserI) => {
    return await service.post(userRoutes.register(), data)
  },
}
