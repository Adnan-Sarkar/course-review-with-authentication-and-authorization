import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IJWTPayload, ILoginUser, IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";
import { createToken } from "./user.utils";
import config from "../../config";

// create user
const createUserIntoDB = async (payload: IUser) => {
  // password hashed
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.SALT_ROUND),
  );

  payload.password = hashedPassword;

  const createdUser = await User.create(payload);

  // remove password field
  const { password, __v, ...result } = { ...createdUser.toObject() };

  return result;
};

// login
const login = async (payload: ILoginUser) => {
  const { username: givenUsername, password: givenPassword } = payload;
  // check there is a user exists based on username
  const user = await User.findOne({ username: givenUsername }).select(
    "+password",
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found!!");
  }

  // check the given password is valid
  const isPasswordValid = await bcrypt.compare(givenPassword, user?.password);

  if (!isPasswordValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect!!");
  }

  const { _id, username, email, role } = user;

  // create new access token
  const jwtPayload: IJWTPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN_SECRET as string,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  );

  const result = {
    user: {
      _id,
      username,
      email,
      role,
    },
    token,
  };

  return result;
};

export const UserServices = {
  login,
  createUserIntoDB,
};
