import { fetchAllLesson } from "@/modules/lesson/actions";
import { Heading } from "@/shared/components/common";

import LessonSaveUrl from "./lesson-save-url";
import VideoPlayer from "./video-player";

interface CourseLessonPlayerProps {
  courseId: string;
  lessonId: string;
  courseSlug: string;
}
const CourseLessonPlayer = async ({
  courseId,
  courseSlug,
  lessonId,
}: CourseLessonPlayerProps) => {
  // lessonList: để .length tính phần trăm bài học và lấy ra tất cả bài học
  const lessonList = await fetchAllLesson({
    course: courseId || "",
  });

  //   Tìm có khoá học lấy id khoá học gắn vào course thì course từ params sẽ là id
  //  lessonDetail: Lấy ra khoá học chi tiết chỉ một.
  // Dùng lessonList để lấy ra các phần tử luôn không cần gọi getLessonBySlug
  const lessonDetail = lessonList?.find(
    (element) => element._id.toString() === lessonId,
  );

  if (!lessonDetail) return null;
  //   videoId: Lấy ra mã video youtube
  //   const videoId = lessonDetail.video_url?.split("v=").at(-1);
  //   lessonListIndex: Lấy ra vị trí index hiện tại (0)
  //   ?? 0: dùng 0 vì đây là giá trị đầu tiên của index nếu dùng 1 hay một số nào khác thì có thể sẽ bỏ qua bài học trước đó sẽ dễ gây ra bug
  const currentLessonIndex =
    lessonList?.findIndex((element) => element._id === lessonId) || 0;

  //    lessonList?.[currentLessonIndex + 1]: currentLessonIndex + 1 là 0 + 1 là = 1. sau đó lessonList[1] sẽ lấy ra phần tử tương ứng là 1 trong mảng lessonList
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const nextLessonUrl = nextLesson
    ? `/${courseSlug}/lesson?id=${nextLesson._id}`
    : "";
  const previousLessonUrl = prevLesson
    ? `/${courseSlug}/lesson?id=${prevLesson._id}`
    : "";

  return (
    <div>
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?id=${lessonId}`}
      />
      <VideoPlayer
        courseId={courseId}
        nextLesson={nextLessonUrl}
        playbackId={lessonDetail.video_url}
        prevLesson={previousLessonUrl}
      />
      <Heading className="text-xl">{lessonDetail.title}</Heading>
      {!!lessonDetail?.content && (
        <div
          className="borderDarkMode bgDarkMode entry-content mb-5 rounded-lg border p-5"
          dangerouslySetInnerHTML={{ __html: lessonDetail.content }}
        />
      )}
    </div>
  );
};

export default CourseLessonPlayer;
