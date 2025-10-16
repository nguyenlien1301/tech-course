"use client";

import CourseItemContinue from "@/modules/course/components/course-item-continue";
import { useQueryFetchUserCoursesContinue } from "@/modules/course/libs/react-query";
import { CourseGrid, Heading } from "@/shared/components/common";
import { useUserContext } from "@/shared/contexts";
import { handleGetStorageLesson } from "@/shared/helper";

const CourseContinue = () => {
  const { userInfo } = useUserContext();
  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || "",
  });
  const courseList = data || [];

  // if (isLoading && courseList.length === 0)
  //   return <EmptyData text="Bạn chưa có khoá học nào" />;

  return (
    <div className="flex flex-col">
      <Heading className="lg:text-xl">Tiếp tục học</Heading>
      <CourseGrid isLoading={isLoading}>
        {!!courseList &&
          courseList.length > 0 &&
          courseList.map((course, index) => {
            const firstLessonUrl = course?.lectures?.[0]?.lessons?.[0]?._id;

            const url = handleGetStorageLesson({
              courseSlug: course.slug,
              lessonId: firstLessonUrl,
            });

            return (
              <CourseItemContinue
                key={course.slug || index}
                cta="Tiếp tục học"
                data={course}
                url={url}
              />
            );
          })}
      </CourseGrid>
    </div>
  );
};

export default CourseContinue;
