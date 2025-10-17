import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { CommentStatus, QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateCommentParams } from "@/shared/types";

import { createComment, deleteComment, updateComment } from "../../actions";

export function useMutationCreateComment() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_COMMENT],
    mutationFn: async (data: CreateCommentParams) => {
      const response = await createComment(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENT_LESSON],
        });
      }
    },
    onError: () => {
      toast.error("Lỗi không thể bình luận");
    },
  });
}
export function useMutationUpdateComment() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_COMMENT],
    mutationFn: async ({
      commentId,
      status,
    }: {
      commentId: string;
      status: CommentStatus;
    }) => {
      const response = await updateComment({ commentId, status });

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENT_SUMMARY],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENT_LESSON],
        });
      }
    },
    onError: () => {
      toast.error("Lỗi không thể bình luận");
    },
  });
}
export function useMutationDeleteComment() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_COMMENT],
    mutationFn: async (commentId: string) => {
      const response = await deleteComment(commentId);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COMMENT_LESSON],
        });
      }
    },
    onError: () => {
      toast.error("Lỗi không thể xoá bình luận");
    },
  });
}
