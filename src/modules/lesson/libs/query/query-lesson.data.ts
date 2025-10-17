import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";

import { getLessonBySlug } from "../../actions";

export const useQueryGetLessonBySlug = (course: string, lessonId: string) => {
  return useQuery({
    enabled: !!course && !!lessonId, // chỉ chạy khi có đủ 2 giá trị
    queryKey: [QUERY_KEYS.GET_LESSON_BY_SLUG, course, lessonId],
    queryFn: () => getLessonBySlug({ course, lessonId }),
    refetchOnWindowFocus: false,
  });
};
