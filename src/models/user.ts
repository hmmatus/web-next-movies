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
