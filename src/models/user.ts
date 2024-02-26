export interface UserI {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  admin = "admin",
  customer = "customer"
}

export interface AdminUserI extends UserI {
  cinemaId: string;
}

export interface SignUpUserI {
  email: string;
  name: string;
  password: string;
  confirmPassword:string;
  cinemaId?: string;
}
