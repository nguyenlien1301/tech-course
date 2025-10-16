import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEYS, UserStatus } from "@/shared/constants";
import { getQueryClient } from "@/shared/lib/react-query";

import { updateUser } from "../../actions";

export const useMutationUpdateUser = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: { userId: string; status: UserStatus }) =>
      updateUser(data),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FETCH_USER] });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_USER_SUMMARY],
        });
      }
    },
    onError: () => {
      toast.error("Cập nhật thành viên thất bại");
    },
  });
};
