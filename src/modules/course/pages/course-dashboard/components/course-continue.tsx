"use client";

import { LayoutGrid, Rows2 } from "lucide-react";
import { useEffect, useState } from "react";

import CourseItemContinue from "@/modules/course/components/course-item-continue";
import { useQueryFetchUserCoursesContinue } from "@/modules/course/libs";
import { CourseGridContinue, Heading } from "@/shared/components/common";
import { useUserContext } from "@/shared/contexts";
import { handleGetStorageLesson } from "@/shared/helper";

const CourseContinue = () => {
  const { userInfo } = useUserContext();
  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || "",
  });

  const [layout, setLayout] = useState<"grid" | "row">("row");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("courseLayout");

    if (saved) {
      setLayout(saved as "grid" | "row");
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("courseLayout", layout);
    }
  }, [layout, isMounted]);

  const courseList = data || [];

  if (!userInfo?.clerkId) return null;

  return (
    <div className="flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading>Tiếp tục học</Heading>
        <div className="flex gap-2 rounded-lg bg-white p-1 shadow-sm">
          <button
            aria-label="Grid layout"
            className={`rounded-md p-2 transition-all duration-300 ${
              layout === "grid"
                ? "bg-[#0077ff] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setLayout("grid")}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            aria-label="Row layout"
            className={`rounded-md p-2 transition-all duration-300 ${
              layout === "row"
                ? "bg-[#0077ff] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setLayout("row")}
          >
            <Rows2 size={20} />
          </button>
        </div>
      </div>
      <CourseGridContinue isLoading={isLoading} layout={layout}>
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
                layout={layout}
                url={url}
              />
            );
          })}
      </CourseGridContinue>
    </div>
  );
};

export default CourseContinue;
