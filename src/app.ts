import express, { Request, Response } from "express";
import cors from "cors";
import globalRouter from "./app/router/router";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cors());

// route
app.use("/api", globalRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to the course review with authentication and authorization backend API",
    details:
      "For github repository, visit: https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-Adnan-Sarkar",
    documentation:
      "For API documentation, visit: https://documenter.getpostman.com/view/15069256/2s9Ykt4ymL",
  });
});

// API route not found
app.all("*", notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
