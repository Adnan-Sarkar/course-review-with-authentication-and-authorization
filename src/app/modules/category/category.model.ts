import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

// create category schema
const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Category created by user id is required"],
  },
});

// create category model
const Category = model<TCategory>("Category", categorySchema);

export default Category;
