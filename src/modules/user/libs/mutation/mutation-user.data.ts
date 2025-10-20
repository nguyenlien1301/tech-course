import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEYS, UserStatus } from "@/shared/constants";
import { getQueryClient } from "@/shared/lib/react-query";
import { UpdateProfileUserParams } from "@/shared/types";

import { updateProfileUser, updateUser } from "../../actions";

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

export const useMutationUpdateProfileUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateData,
      userId,
    }: {
      userId: string;
      updateData: UpdateProfileUserParams;
    }) => await updateProfileUser({ userId, updateData }),

    onSuccess: (response) => {
      if (response) {
        // ✅ Cập nhật lại dữ liệu user trên UI
        toast.success("Cập nhật thông tin thành công");
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_USER_INFO],
        });
      }
    },

    onError: (error) => {
      console.error("🚀error updateProfileUser:", error);
    },
  });
};
