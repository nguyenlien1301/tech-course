import { model, models, Schema } from "mongoose";

import { CouponType } from "../constants";
import { Coupon } from "../types/models";

const couponSchema = new Schema<Coupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  used: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
  },
  value: {
    type: Number,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  type: {
    type: String,
    enum: Object.values(CouponType),
    default: CouponType.PERCENT,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CouponModel = models.Coupon || model<Coupon>("Coupon", couponSchema);

export default CouponModel;
