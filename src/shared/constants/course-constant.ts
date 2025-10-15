import { BadgeStatusVariant } from "../types";
import { Courselevel, CourseOptions, CourseStatus } from "./enums";

export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: CourseStatus.APPROVED,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: CourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Từ chối",
    value: CourseStatus.REJECTED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
];

export const courseLevel: {
  title: string;
  value: Courselevel;
}[] = [
  {
    title: "Dễ",
    value: Courselevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: Courselevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: Courselevel.ADVANCED,
  },
];

export const courseLevelTitle: Record<Courselevel, string> = {
  [Courselevel.BEGINNER]: "Dễ",
  [Courselevel.INTERMEDIATE]: "Trung bình",
  [Courselevel.ADVANCED]: "Khó",
};

export const courseSortOptions: {
  title: string;
  value: CourseOptions;
  className?: string;
}[] = [
  {
    title: "Mới nhất",
    value: CourseOptions.LATEST,
    className: "text-green-500 bg-green-500/10",
  },
  {
    title: "Miễn phí",
    value: CourseOptions.FREE,
    className: "text-orange-500 bg-orange-500/10",
  },
];
