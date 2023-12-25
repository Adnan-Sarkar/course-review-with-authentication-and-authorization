export interface IPasswordHistory {
  password: string;
  timestamp: Date;
}

export type TUserRoles = "user" | "admin";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: TUserRoles;
  passwordHistory?: IPasswordHistory[];
  __v?: number;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IJWTPayload {
  _id: string;
  role: string;
  email: string;
}

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
}
