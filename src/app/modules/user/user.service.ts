import httpStatus from "http-status";
import AppError from "../../error/AppError";
import {
  IJWTPayload,
  ILoginUser,
  IPasswordChange,
  IUser,
} from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";
import { createToken, formatDateTime } from "./user.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

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

// change password
const changePassword = async (user: JwtPayload, payload: IPasswordChange) => {
  // get the user
  const currentUser = await User.findById(user._id).select(
    "password passwordHistory",
  );

  if (!currentUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const { currentPassword, newPassword } = payload;
  // check current passwrod is valid
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    currentUser.password,
  );

  if (!isCurrentPasswordValid) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      message: `Password change failed. Current password is incorrect.`,
    };
  }

  // checked if the new password matches 2 latest password history
  const latestTwoPasswordHistory = currentUser?.passwordHistory?.slice(-2);
  if (
    latestTwoPasswordHistory &&
    (latestTwoPasswordHistory?.length as number) > 0
  ) {
    const [previousPassword1, previousPassword2] = latestTwoPasswordHistory;

    if (
      previousPassword1 &&
      (await bcrypt.compare(newPassword, previousPassword1.password))
    ) {
      return {
        statusCode: httpStatus.BAD_REQUEST,
        message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formatDateTime(
          previousPassword1.timestamp,
        )}).`,
      };
    }

    if (
      previousPassword2 &&
      (await bcrypt.compare(newPassword, previousPassword2.password))
    ) {
      return {
        statusCode: httpStatus.BAD_REQUEST,
        message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formatDateTime(
          previousPassword2.timestamp,
        )}).`,
      };
    }
  }

  // start session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // change the password history before update the new password
    const newPasswordHistory = {
      password: currentUser.password,
      timestamp: new Date(),
    };
    await User.findByIdAndUpdate(
      currentUser._id,
      {
        $push: {
          passwordHistory: {
            $each: [newPasswordHistory],
            $slice: -2,
          },
        },
      },
      {
        runValidators: true,
        session,
      },
    );

    // hashed new password
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      Number(config.SALT_ROUND),
    );

    // change the password
    const result = await User.findByIdAndUpdate(
      currentUser._id,
      {
        password: hashedNewPassword,
      },
      {
        runValidators: true,
        session,
        new: true,
      },
    );

    await session.commitTransaction();
    return {
      data: result,
    };
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  } finally {
    await session.endSession();
  }
};

export const UserServices = {
  login,
  createUserIntoDB,
  changePassword,
};
