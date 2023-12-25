import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

// create a category
const createCategory = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user._id,
  };

  const result = await CategoryServices.createCategoryIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

// get all categories
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategorieFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
