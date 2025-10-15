import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { QueryFilter } from "@/shared/types";

import {
  fetchAllCoursesPublic,
  fetchCourses,
  fetchCourseSummary,
} from "../../actions";

interface QueryFetchCourseProps extends QueryFilter {}

export const useQueryFetchCoursesPublic = (props: QueryFetchCourseProps) => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COURSES_PUBLIC], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchAllCoursesPublic(props);

      return hasResult || [];
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};

export const useQueryFetchCourses = (props: QueryFetchCourseProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COURSES, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchCourses(props);

      return {
        courses: hasResult?.courses || [],
        total: hasResult?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};

export const useQueryFetchCoursesSummary = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COURSE_SUMMARY], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchCourseSummary();

      return response || [];
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};
