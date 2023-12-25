import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middleware/auth";

const courseRouter = express.Router();
const coursesRouter = express.Router();

// for route: /api/course
courseRouter.get("/best", CourseController.getBestCourse);

// for route: /api/courses
coursesRouter.post(
  "/",
  auth("admin"),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

coursesRouter.get(
  "/:courseId/reviews",
  CourseController.getCourseByIdWithReviews,
);

coursesRouter.put(
  "/:courseId",
  auth("admin"),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);

coursesRouter.get("/", CourseController.getAllCourses);

export const CoursesRoutes = coursesRouter;
export const CourseRoutes = courseRouter;
