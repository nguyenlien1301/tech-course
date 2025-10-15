import { BadgeStatusVariant, RatingIcon } from "../types";
import { RatingStatus } from "./enums";

export const ratingStatus: {
  title: string;
  value: RatingStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: RatingStatus.ACTIVE,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: RatingStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
];

export const ratingList: {
  title: RatingIcon;
  value: number;
}[] = [
  {
    title: "awesome",
    value: 5,
  },
  {
    title: "good",
    value: 4,
  },
  {
    title: "meh",
    value: 3,
  },
  {
    title: "bad",
    value: 2,
  },
  {
    title: "terrible",
    value: 1,
  },
];
