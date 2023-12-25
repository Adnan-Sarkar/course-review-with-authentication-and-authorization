import { Types } from "mongoose";

export interface TCategory {
  name: string;
  createdBy: Types.ObjectId;
  __v?: number;
}
