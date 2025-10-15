import { BadgeStatusVariant } from "../types";
import { UserStatus } from "./enums";

export const userStatus: {
  title: string;
  value: UserStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đang hoạt động",
    value: UserStatus.ACTIVE,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chưa kích hoạt",
    value: UserStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Bị cấm",
    value: UserStatus.BANED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
];
