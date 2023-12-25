export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
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
