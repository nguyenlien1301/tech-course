import { Document, Schema } from "mongoose";

import { OrderStatus } from "@/shared/constants";

export interface Order extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  coupon?: Schema.Types.ObjectId;
  status: OrderStatus;
  total: number;
  amount: number;
  discount: number;
  created_at: Date;
}
