import { Lesson } from "./models";

export interface LessonItemData extends Omit<Lesson, "course" | "lecture"> {
  course: string;
  lecture: string;
}

// lesson
export type CreateLessonParams = {
  lecture: string;
  course: string;
  slug?: string;
  order?: number;
  title?: string;
  path?: string;
};

export type UpdateLessonParams = {
  lessonId: string;
  courseId: string;
  lectureId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
    order?: number;
    _destroy?: boolean;
  };
  path?: string;
};
