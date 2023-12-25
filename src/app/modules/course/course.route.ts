import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middleware/auth";

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  auth("admin"),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

coursesRouter.get("/best", CourseController.getBestCourse);

// for route: /api/courses
coursesRouter.get(
  "/:courseId/reviews",
  CourseController.getCourseByIdWithReviews,
);

coursesRouter.put(
  "/:courseId",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);

coursesRouter.get("/", CourseController.getAllCourses);

export const CoursesRoutes = coursesRouter;
