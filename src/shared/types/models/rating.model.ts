import { Document, Schema } from "mongoose";

import { RatingStatus } from "@/shared/constants";

export interface Rating extends Document {
  _id: string;
  rate: number;
  content: string;
  status: RatingStatus;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  created_at: Date;
}
