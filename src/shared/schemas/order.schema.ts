import { model, models, Schema } from "mongoose";

import { OrderStatus } from "@/shared/constants";

import { Order } from "../types/models";

const orderSchema = new Schema<Order>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = models.Order || model<Order>("Order", orderSchema);

export default OrderModel;
