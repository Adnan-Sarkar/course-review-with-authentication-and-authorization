import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidations } from "./category.validation";
import { CategoryControllers } from "./category.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(CategoryValidations.categoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get("/", CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
