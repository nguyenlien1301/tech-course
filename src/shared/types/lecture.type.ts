import { LessonItemData } from "./lesson.type";
import { Lecture } from "./models";

export type CreateLectureParams = {
  course: string; // Bắt buộc phải biết nó thuộc khoá học nào
  title?: string;
  order?: number;
  path?: string;
};

// Cập nhật chương
export type UpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
  };
  path?: string;
};
export interface LectureItemData extends Omit<Lecture, "lessons"> {
  lessons: LessonItemData[];
}
