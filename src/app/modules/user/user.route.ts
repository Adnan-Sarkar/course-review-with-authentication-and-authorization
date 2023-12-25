import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { UserController } from "./user.controller";

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

export const UserRoutes = route;
