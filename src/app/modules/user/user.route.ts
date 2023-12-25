import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";

const route = express.Router();

route.post(
  "/register",
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
);

route.post(
  "/login",
  validateRequest(UserValidations.loginUserValidationSchema),
  UserController.login,
);

route.post(
  "/change-password",
  auth("user"),
  validateRequest(UserValidations.changePasswordValidationSchema),
  UserController.changePassword,
);

export const UserRoutes = route;
