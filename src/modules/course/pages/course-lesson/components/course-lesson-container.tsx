import { Suspense } from "react";

import PageNotFound from "@/app/not-found";
import { fetchCourseBySlug } from "@/modules/course/actions";
import { fetchHistory } from "@/modules/history/actions";
import { countLessonByCourseId } from "@/modules/lesson/actions";
import { Loading } from "@/shared/components/common";
import { CourseOutline } from "@/shared/components/course";
import { CourseLessonPageRootProps } from "@/shared/types/course.type";

import CourseLessonComment from "./course-lesson-comment";
import CourseLessonOutline from "./course-lesson-outline";
import CourseLessonPlayer from "./course-lesson-player";
import LoadingPLayer from "./course-lesson-player/loading-player";
import LessonWrapper from "./lesson-wrapper";

const CourseLessonContainer = async ({
  params,
  searchParams,
}: CourseLessonPageRootProps) => {
  const courseSlug = params.course;
  const lessonId = searchParams.id;

  if (!courseSlug || !lessonId) return <PageNotFound />;
  //   Tìm course vì trong khoá học ko có lưu course mà là lưu objectId
  const findCourse = await fetchCourseBySlug({ slug: courseSlug });

  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const histories = await fetchHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ courseId });
  const completeNumber = ((histories?.length || 0) / (lessonCount || 1)) * 100;

  return (
    <LessonWrapper courseId={courseId}>
      <div>
        <Suspense fallback={<LoadingPLayer />}>
          <CourseLessonPlayer
            courseId={courseId}
            courseSlug={courseSlug}
            lessonId={lessonId}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CourseLessonComment
            courseId={courseId}
            lessonId={lessonId}
            sort={searchParams.sort}
          />
        </Suspense>
      </div>
      <CourseLessonOutline completeNumber={completeNumber}>
        <CourseOutline
          course={courseSlug}
          histories={histories || []}
          lectures={lectures}
          lessonId={lessonId}
        />
      </CourseLessonOutline>
    </LessonWrapper>
  );
};

export default CourseLessonContainer;
