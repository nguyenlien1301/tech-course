import { model, models, Schema } from "mongoose";

import { RatingStatus } from "@/shared/constants";

import { Rating } from "../types/models";

const ratingSchema = new Schema<Rating>({
  rate: {
    type: Number,
    default: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(RatingStatus),
    default: RatingStatus.UNACTIVE,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const RatingModel = models.Rating || model<Rating>("Rating", ratingSchema);

export default RatingModel;
