"use client";

import Link from "next/link";

import { createHistory } from "@/modules/history/actions";
import { IconPlay } from "@/shared/components/icons";
import { Checkbox } from "@/shared/components/ui";
import { cn } from "@/shared/utils/common";

// whitespace-nowrap và line-clam sẽ ko dùng chung với nhau đc vì.
interface CourseOutlineItemProps {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}
const CourseOutlineItem = ({
  isActive = false,
  isChecked = false,
  lesson,
  url,
}: CourseOutlineItemProps) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url,
      });
    } catch (error) {
      console.log("🚀error handleCompleteLesson---->", error);
    }
  };

  return (
    <div
      key={lesson._id}
      className={cn(
        isActive ? "text-primary font-semibold" : "",
        "flex items-center gap-2 bgDarkMode border borderDarkMode p-3 rounded-lg",
      )}
    >
      {!!url && (
        <Checkbox
          className="inline-block shrink-0"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}

      <IconPlay className="size-4 shrink-0" />
      {url ? (
        <Link
          className={cn(isActive ? "pointer-events-none" : "", "line-clamp-1")}
          href={url}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1 font-semibold">{lesson.title}</h4>
      )}
      <span className="ml-auto shrink-0 text-xs font-medium">
        {lesson.duration} Phút
      </span>
    </div>
  );
};

export default CourseOutlineItem;
