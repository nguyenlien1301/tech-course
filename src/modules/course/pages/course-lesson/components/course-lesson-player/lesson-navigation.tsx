"use client";

import { useRouter } from "next/navigation";

import { IconArrowLeft, IconArrowRight } from "@/shared/components/icons";
import { Button } from "@/shared/components/ui";

interface LessonNavigationProps {
  prevLesson: string;
  nextLesson: string;
}
const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: LessonNavigationProps) => {
  const router = useRouter();
  // const prevLessonUrl =
  //   `/${courseParams}/lesson?slug=${prevLesson?.slug}` || "";
  // const nextLessonUrl = `/${courseParams}/lesson?slug=${nextLesson?.slug}`;

  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        disabled={!prevLesson}
        onClick={() => (prevLesson ? router.push(prevLesson) : null)}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-10 p-3"
        disabled={!nextLesson}
        onClick={() => (nextLesson ? router.push(nextLesson) : null)}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
