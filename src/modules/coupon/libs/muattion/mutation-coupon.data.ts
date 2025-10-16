import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateCouponParams, UpdateCouponParams } from "@/shared/types";

import { createCoupon, deleteCoupon, updateCoupon } from "../../actions";

export function useMutationCreateCoupon() {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_COUPON],
    mutationFn: async (data: CreateCouponParams) => {
      const response = await createCoupon(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COUPON],
        });
        toast.success("Tạo mã giảm giá thành công");
        router.push("/manage/coupon");
      }
    },
    onError: () => {
      toast.error("Tạo mã giảm giá thất bại");
    },
  });
}
export function useMutationUpdateCoupon() {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_COUPON],
    mutationFn: async (params: UpdateCouponParams) => {
      const response = await updateCoupon(params);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response?.code) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COUPON],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COUPON_SUMMARY],
        });
        toast.success("Cập nhật mã giảm giá thành công");
        router.push("/manage/coupon");
      }
    },
    onError: () => {
      toast.error("Cập nhật mã giảm giá thất bại");
    },
  });
}

export function useMutationDeleteCoupon() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_COUPON],
    mutationFn: async (code: string) => {
      const response = await deleteCoupon(code);

      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.FETCH_COUPON],
        });
        toast.success("Xoá mã giảm giá thành công");
      }
    },
    onError: () => {
      toast.error("Xoá mã giảm giá thất bại");
    },
  });
}
