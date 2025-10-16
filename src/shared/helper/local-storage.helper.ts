import { lastLessonKey, StorageLesson } from "../constants";

export const handleGetStorageLesson = ({
  courseSlug,
  lessonId,
}: {
  courseSlug: string;
  lessonId: string;
}) => {
  if (typeof localStorage === "undefined") return;
  const lessons = (
    localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
      : []
  ) as StorageLesson[];
  const findCourse = lessons.find((lesson) => lesson.course === courseSlug);

  if (!findCourse) {
    return `/${courseSlug}/lesson?id=${lessonId}`;
  }

  return findCourse?.lesson;
};
