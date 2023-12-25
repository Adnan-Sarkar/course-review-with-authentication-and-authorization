import express from "express";
import { CourseRoutes, CoursesRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";

const globalRouter = express.Router();

const routeList = [
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/courses",
    route: CoursesRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/auth",
    route: UserRoutes,
  },
];

routeList.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

export default globalRouter;
