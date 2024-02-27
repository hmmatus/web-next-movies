export interface UserI {
  id: string;
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
  idCinema: string;
}

export interface SignUpAdminUserI {
  email: string;
  name: string;
  password: string;
  confirmPassword:string;
  idCinema: string;
}

export interface SignUpUserI {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
