import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { CourseItemData, QueryFilter } from "@/shared/types";

import {
  fetchAllCoursesPublic,
  fetchCourseBySlug,
  fetchCourseOfUser,
  fetchCourses,
  fetchCourseSummary,
  fetchUserCoursesContinue,
  getCourseLessonInfo,
} from "../../actions";

interface QueryFetchCourseProps extends QueryFilter {}

export const useQueryFetchCoursesPublic = (props: QueryFetchCourseProps) => {
  const { option, search } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_COURSES_PUBLIC, search || "", option || ""], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchAllCoursesPublic(props);

      return hasResult || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};

export const useQueryFetchCourses = (props: QueryFetchCourseProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_COURSES, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchCourses(props);

      return {
        courses: hasResult?.courses || [],
        total: hasResult?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};

export const useQueryFetchCourseBySlug = (slug: string) => {
  return useQuery<CourseItemData>({
    queryKey: [QUERY_KEYS.FETCH_COURSE_BY_SLUG],
    queryFn: async () => {
      const response = await fetchCourseBySlug({ slug });

      return parseData(response as CourseItemData);
    },
    enabled: !!slug, // chỉ gọi khi có slug
  });
};

export const useQueryFetchCourseLessonInfo = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_COURSE_LESSON_INFO],
    queryFn: async () => {
      if (!slug) return null;
      const response = await getCourseLessonInfo({ slug });

      return parseData(response);
    },
    enabled: !!slug,
  });
};

export const useQueryFetchCoursesSummary = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_COURSE_SUMMARY], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchCourseSummary();

      return response || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};

interface QueryFetchUserCourseProps {
  clerkId: string;
}

export const useQueryFetchUserCoursesContinue = ({
  clerkId,
}: QueryFetchUserCourseProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_USER_COURSES, clerkId], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchUserCoursesContinue({ clerkId });

      return hasResult || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};

export const useQueryFetchCourseOfUser = (userId: string) => {
  return useQuery<CourseItemData[]>({
    enabled: !!userId, // chỉ fetch khi có userId
    queryKey: [QUERY_KEYS.FETCH_COURSE_OF_USER, userId],
    queryFn: async () => {
      const response = await fetchCourseOfUser(userId);

      return parseData(response);
    },
    placeholderData: keepPreviousData, // giữ data cũ khi refetch
  });
};
