import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEYS } from "@/shared/constants";
import { getQueryClient } from "@/shared/lib/react-query";
import { AddFavoriteParams } from "@/shared/types";

import { addFavorite } from "../../actions";

export const useMutationAddFavorite = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: AddFavoriteParams) => {
      return await addFavorite(data);
    },

    onSuccess: (response) => {
      if (!response) return;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_FAVORITES],
      });

      const courseId = response.course?.toString();

      if (response.status === "added") {
        toast.success("Đã thêm vào danh sách yêu thích!");
        queryClient.setQueryData<string[]>(
          [QUERY_KEYS.FETCH_FAVORITES],
          (old = []) => [...old, courseId],
        );
      }

      if (response.status === "removed") {
        toast.info("Đã xóa khỏi danh sách yêu thích!");
        queryClient.setQueryData<string[]>(
          [QUERY_KEYS.FETCH_FAVORITES],
          (old = []) => old.filter((id) => id !== courseId),
        );
      }
    },

    onError: (error) => {
      console.error("🚀error useMutationAddFavorite ---->", error);
      toast.error("Có lỗi xảy ra khi thêm vào yêu thích!");
    },
  });
};
