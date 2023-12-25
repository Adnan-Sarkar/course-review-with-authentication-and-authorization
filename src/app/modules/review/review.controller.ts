import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

// create a review
const createReview = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user._id,
  };

  const result = await ReviewServices.createReviewIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
