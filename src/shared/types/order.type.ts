import { CouponItemData, CourseItemData } from "./app.type";
import { Order } from "./models";
import { UserItemData } from "./user.type";

export interface OrderItemData
  extends Omit<Order, "course" | "user" | "coupon"> {
  course: CourseItemData;
  user: UserItemData;
  coupon: CouponItemData;
}

// type tạo đơn hàng
export type CreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};
