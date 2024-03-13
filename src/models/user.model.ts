export interface UserI {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  admin = "admin",
  user = "user"
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

export interface GetUserResponseI {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterUserI {
  id?: string;
  email: string;
  name: string;
  password: string;
  role?: "user"
}

export interface GetMovieFilters {
  orderBy: "default" | "likes";
  onlyAvailable: boolean;
  searchValue: string;
  limit: number;
  currentPage: number;
}
