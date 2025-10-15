import { LectureItemData } from "./lecture.type";
import { Coupon, Course, Rating } from "./models";
import { UserItemData } from "./user.type";

export interface RatingItemData extends Omit<Rating, "course" | "user"> {
  course: CourseItemData;
  user: UserItemData;
}

//  Omit<Course, "lectures" | "rating">: loại bỏ 2 này ra khỏi model Course vì trong đó nó đang là ObjectId[] và viết lại là một mảng
export interface CourseItemData extends Omit<Course, "lectures" | "rating"> {
  lectures: LectureItemData[];
  rating: RatingItemData[];
}

export interface CouponItemData extends Omit<Coupon, "courses"> {
  courses: CourseItemData[];
}
