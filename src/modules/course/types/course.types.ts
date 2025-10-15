import { z } from "zod";

import { courseCommentFormSchema } from "../schemas";

export interface LastLessonData {
  course: string;
  lesson: string;
}

export type CourseCommentFormValues = z.infer<typeof courseCommentFormSchema>;
