"use client";

import { CourseItem } from "@/modules/course/components";
import { useQueryFetchCoursesPublic } from "@/modules/course/libs";
import { CourseGrid, Heading } from "@/shared/components/common";
import { CourseStatus } from "@/shared/constants";

const CourseSuggestion = () => {
  const { data, isLoading } = useQueryFetchCoursesPublic({
    limit: 3,
    status: CourseStatus.APPROVED,
  });
  const courseList = data || [];

  return (
    <div className="flex flex-col">
      <Heading>Đề xuất</Heading>
      <CourseGrid isLoading={isLoading}>
        {!!courseList &&
          courseList.length > 0 &&
          courseList.map((course, index) => (
            <CourseItem key={course.slug || index} data={course} />
          ))}
      </CourseGrid>
    </div>
  );
};

export default CourseSuggestion;
