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

export const UserRoutes = route;
