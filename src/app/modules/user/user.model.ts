import { Schema, model } from "mongoose";
import { IPasswordHistory, IUser } from "./user.interface";
import { UserRoles } from "./user.constant";

const passwordHistorySchema = new Schema<IPasswordHistory>(
  {
    password: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User email is required"],
    },
    password: {
      type: String,
      min: 5,
      select: false,
      required: [true, "User password is required"],
    },
    role: {
      type: String,
      enum: UserRoles,
      default: "user",
    },
    passwordHistory: {
      type: [passwordHistorySchema],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// create user model
const User = model<IUser>("User", userSchema);

export default User;
