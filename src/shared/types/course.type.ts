import { QuerySortFilter } from "./common";
import { Course, Lesson } from "./models";

export interface CourseLessonData {
  duration: number;
  lessons: number;
}
// tạo khoá học
export type CreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
// Sửa khoá học
export type UpdateCourseParams = {
  slug: string;
  // Course: Là những cái trong course model có thể cập nhật đc
  // Partial: biến tất cả trong Course là ko bắt buộc
  updateData: Partial<Course>;
  path?: string;
};
export interface CourseQAData {
  question: string;
  answer: string;
}

export interface CourseLessonPageRootProps {
  params: {
    course: string;
  };
  searchParams: {
    id: string;
    slug: string;
    sort: QuerySortFilter;
  };
}

export type UpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: Lesson[];
};

// Type này để làm chức năng filter course-manage
export type GetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  option?: string;
};
