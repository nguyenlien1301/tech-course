"use client";

import CourseItem from "@/modules/course/components";
import { useQueryFetchCourseOfUser } from "@/modules/course/libs";
import { CourseGrid } from "@/shared/components/common";
import { useUserContext } from "@/shared/contexts";
import { handleGetStorageLesson } from "@/shared/helper";

const StudyPageContainer = () => {
  const { userInfo } = useUserContext();

  const { data: courses, isLoading } = useQueryFetchCourseOfUser(
    userInfo?.clerkId || "",
  );

  return (
    <CourseGrid isLoading={isLoading} userId={!userInfo?.clerkId}>
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
