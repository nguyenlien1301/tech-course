"use client";

import { useEffect, useState } from "react";

import CourseItem from "@/modules/course/components";
import { LastLessonData } from "@/modules/course/types";
import { CourseGrid } from "@/shared/components/common";
import { lastLessonKey } from "@/shared/constants";
import { CourseItemData } from "@/shared/types";

interface StudyPageContainerProps {
  courses: CourseItemData[];
}
const StudyPageContainer = ({ courses }: StudyPageContainerProps) => {
  const [lastLesson, setLastLesson] = useState<LastLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
      : [];

    setLastLesson(lesson);
  }, []);
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {!!courses &&
        courses.length > 0 &&
        courses.map((course, index) => {
          const firstLessonUrl = course.lectures[0].lessons[0]._id;

          const lastURL =
            lastLesson.find((element) => element.course === course.slug)
              ?.lesson || `/${course.slug}/lesson?id=${firstLessonUrl}`;

          return (
            <CourseItem
              key={course.slug || index}
              cta="Tiếp tục học"
              data={course}
              url={lastURL}
            />
          );
        })}
    </CourseGrid>
  );
};

export default StudyPageContainer;
