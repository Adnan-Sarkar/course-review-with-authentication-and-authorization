export interface IPasswordHistory {
  password: string;
  timestamps: Date;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
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
