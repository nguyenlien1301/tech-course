import { useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import {
  CreateCourseParams,
  UpdateCourseParams,
} from "@/shared/types/course.type";

import { createCourse, updateCourse } from "../../actions";

export function useMutationCreateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourseParams) => {
      const response = await createCourse(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COURSES],
        });
      }
    },
  });
}

export function useMutationUpdateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCourseParams) => {
      const response = await updateCourse(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COURSES],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COURSE_SUMMARY],
        });
      }
    },
  });
}
