import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { UserRoles } from "./user.constant";

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
      required: [true, "User password is required"],
      select: 0,
    },
    role: {
      type: String,
      enum: UserRoles,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// create user model
const User = model<IUser>("User", userSchema);

export default User;
