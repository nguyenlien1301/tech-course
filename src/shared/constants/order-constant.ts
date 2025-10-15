import { BadgeStatusVariant } from "../types";
import { OrderStatus } from "./enums";

export const orderStatus: {
  title: string;
  value: OrderStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: OrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: OrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Đã huỷ",
    value: OrderStatus.CANCELED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
];
