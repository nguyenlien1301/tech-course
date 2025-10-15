"use client";

import { useUserContext } from "@/shared/contexts";
import { useGlobalStore } from "@/shared/store";

// LessonWrapper: component này tách ra nhầm mục đích setState() để làm chức năng mở rộng video khi học
interface LessonWrapperProps {
  children: React.ReactNode;
  courseId: string;
}
const LessonWrapper = ({ children, courseId }: LessonWrapperProps) => {
  const { shouldExpandedPlayer } = useGlobalStore();
  const { userInfo } = useUserContext();
  const userCourses = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo?.courses))
    : [];

  if (!userCourses.includes(courseId) || !userInfo?._id) return null;

  return (
    <div
      className="grid min-h-screen items-start gap-10 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]"
      style={{
        display: shouldExpandedPlayer ? "block" : "grid",
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
