"use client";
import { useEffect, useState } from "react";

import CourseItem from "@/modules/course/components";
import { useQueryFetchUserCoursesContinue } from "@/modules/course/libs/react-query";
import { LastLessonData } from "@/modules/course/types";
import { CourseGrid } from "@/shared/components/common";
import { lastLessonKey } from "@/shared/constants";
import { useUserContext } from "@/shared/contexts";

const CourseContinue = () => {
  const { userInfo } = useUserContext();
  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || "",
  });
  const courseList = data || [];
  const [lastLesson, setLastLesson] = useState<LastLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
      : [];

    setLastLesson(lesson);
  }, []);

  return (
    <CourseGrid isLoading={isLoading}>
      {!!courseList &&
        courseList.length > 0 &&
        courseList.map((course, index) => {
          const firstLessonUrl = course?.lectures?.[0]?.lessons?.[0]?._id;

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

export default CourseContinue;
