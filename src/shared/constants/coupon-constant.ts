import { CouponType } from "./enums";

export const couponTypes: { title: string; value: CouponType }[] = [
  {
    title: "Phần trăm",
    value: CouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: CouponType.AMOUNT,
  },
];

export const couponStatus: {
  title: string;
  value: number;
  className?: string;
}[] = [
  {
    title: "Đã kích hoạt",
    value: 1,
    className: "text-green-500 bg-green-500/10",
  },
  {
    title: "Chưa kích hoạt",
    value: 0,
    className: "text-orange-500 bg-orange-500/10",
  },
];
