import { Document, Schema } from "mongoose";

import { CouponType } from "@/shared/constants";

export interface Coupon extends Document {
  _id: string;
  title: string;
  code: string;
  active: boolean;
  used: number;
  limit: number;
  value: number;
  courses: Schema.Types.ObjectId[];
  type: CouponType;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}
