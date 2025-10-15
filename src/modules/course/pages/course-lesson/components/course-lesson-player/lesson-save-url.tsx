"use client";

import { useEffect } from "react";

import { lastLessonKey } from "@/shared/constants";

// bắt buộc phải truyền cả url là slug của bài học và course
// Vì sẽ có nhiều khoá học nếu chỉ lưu cả đường dẫn url thì nó sẽ chỉ lấy cái đường dẫn khoá học đó. VD: /khoa-hoc-nextjs/lesson?slug="bai-1" thì khi lưu mà ko có course thì nó sẽ luôn lấy khoa-hoc-nextjs dù khi truy cập qua bất cứ khoa học khác.
interface LessonSaveUrlProps {
  course: string;
  url: string;
}
const LessonSaveUrl = ({ course, url }: LessonSaveUrlProps) => {
  useEffect(() => {
    let results: { course: string }[] =
      JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((element) => element.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [course, url]);

  return null;
};

export default LessonSaveUrl;
