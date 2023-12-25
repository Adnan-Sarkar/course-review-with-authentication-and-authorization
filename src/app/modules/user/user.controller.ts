import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// create user
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

// login
const login = catchAsync(async (req, res) => {
  const result = await UserServices.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successful",
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const result = await UserServices.changePassword(req.user, req.body);

  if (result?.statusCode) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: result.message,
      data: null,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password changed successfully",
      data: result.data,
    });
  }
});

export const UserController = {
  createUser,
  login,
  changePassword,
};
