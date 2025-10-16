import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateRatingParams } from "@/shared/types";

import { createRating, deleteRating, updateRating } from "../../actions";

export function useMutationCreateRating() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_RATING],
    mutationFn: async (data: CreateRatingParams) => {
      const response = await createRating(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_RATING],
        });
        toast.success("Đánh giá thành công");
      }
    },
    onError: () => {
      toast.error("Lỗi không thể đánh giá");
    },
  });
}

export function useMutationUpdateRating() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_RATING],
    mutationFn: async (id: string) => {
      const response = await updateRating(id);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_RATING],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_RATING_SUMMARY],
        });
        toast.success("Cập nhật đánh giá thành công");
      }
    },
    onError: () => {
      toast.error("Lỗi không thể cập nhật");
    },
  });
}
export function useMutationDeleteRating() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_RATING],
    mutationFn: async (id: string) => {
      const response = await deleteRating(id);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_RATING],
        });
        toast.success("Xoá đánh giá thành công");
      }
    },
    onError: () => {
      toast.error("Lỗi không thể xoá");
    },
  });
}
