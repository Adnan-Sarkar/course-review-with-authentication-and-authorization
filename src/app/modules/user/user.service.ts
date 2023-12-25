import { IUser } from "./user.interface";
import User from "./user.model";

// create user
const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

export const UserServices = {
  createUserIntoDB,
};
