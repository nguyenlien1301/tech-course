"use client";

import { useEffect, useState } from "react";

import { IconClock } from "@/shared/components/icons";
import { formatMinutesToHour } from "@/shared/helper";

import { getCourseLessonInfo } from "../actions";

const CourseItemDuration = ({ slug }: { slug: string }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function getDuration() {
      const hasResult = await getCourseLessonInfo({ slug });

      setDuration(hasResult?.duration || 0);
    }
    getDuration();
  }, [slug]);

  return (
    <div className="flex items-center gap-2 dark:text-graySlate">
      <IconClock className="size-4" />
      <span>{formatMinutesToHour(duration)}</span>
    </div>
  );
};

export default CourseItemDuration;
