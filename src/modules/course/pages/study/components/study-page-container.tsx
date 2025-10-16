"use client";

import CourseItem from "@/modules/course/components";
import { CourseGrid } from "@/shared/components/common";
import { handleGetStorageLesson } from "@/shared/helper";
import { CourseItemData } from "@/shared/types";

interface StudyPageContainerProps {
  courses: CourseItemData[];
}
const StudyPageContainer = ({ courses }: StudyPageContainerProps) => {
  return (
    <CourseGrid>
      {!!courses &&
        courses.length > 0 &&
        courses.map((course, index) => {
          const firstLessonUrl = course?.lectures?.[0]?.lessons?.[0]?._id;

          const url = handleGetStorageLesson({
            courseSlug: course.slug,
            lessonId: firstLessonUrl,
          });

          return (
            <CourseItem
              key={course.slug || index}
              cta="Tiếp tục học"
              data={course}
              url={url}
            />
          );
        })}
    </CourseGrid>
  );
};

export default StudyPageContainer;
