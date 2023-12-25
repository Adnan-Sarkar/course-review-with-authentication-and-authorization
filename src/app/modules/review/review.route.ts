import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/",
  auth("user"),
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewController.createReview,
);

export const ReviewRoutes = router;
