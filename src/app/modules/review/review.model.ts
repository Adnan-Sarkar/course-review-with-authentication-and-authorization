import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

// create review schema
const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required"],
    },
    review: {
      type: String,
      trim: true,
      required: [true, "Review text is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review created by user id is required"],
    },
  },
  {
    timestamps: true,
  },
);

// create review model
const Review = model<TReview>("Review", reviewSchema);

export default Review;
