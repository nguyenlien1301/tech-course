"use client";

import CourseItem from "@/modules/course/components";
import { useQueryFetchCoursesPublic } from "@/modules/course/libs/react-query";
import { CourseGrid } from "@/shared/components/common";
import { CourseStatus } from "@/shared/constants";

const CourseSuggestion = () => {
  const { data, isLoading } = useQueryFetchCoursesPublic({
    limit: 3,
    status: CourseStatus.APPROVED,
  });
  const courseList = data || [];

  return (
    <CourseGrid isLoading={isLoading}>
      {!!courseList &&
        courseList.length > 0 &&
        courseList.map((course, index) => (
          <CourseItem key={course.slug || index} data={course} />
        ))}
    </CourseGrid>
  );
};

export default CourseSuggestion;
