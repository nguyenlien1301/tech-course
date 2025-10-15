import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateCouponParams } from "@/shared/types";

import { createCoupon, deleteCoupon } from "../../actions";

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
