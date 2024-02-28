import { AdminUserI, SignUpAdminUserI, SignUpUserI, UserI } from "@/models/user";
import { service } from "../config";
import { userRoutes } from "./userRoutes";

export const userService = {
  signUp: (data: SignUpAdminUserI | SignUpUserI) => {
    return service.post(userRoutes.register(), {
      ...data,
    });
  },
  login: ({ email, password }: { email: string; password: string }) => {
    return service.post(userRoutes.loginUser(), {
      email,
      password,
    });
  },
  getUserData: (userId: string) => {
    return service.get(userRoutes.getUserData(userId));
  }
};
