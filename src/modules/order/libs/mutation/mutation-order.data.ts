import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateOrderParams } from "@/shared/types";

import { createOrder } from "../../actions";

export function useMutationCreateOrder() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_ORDER],
    mutationFn: async (data: CreateOrderParams) => {
      const response = await createOrder(data);

      return parseData(response);
    },
    // Khi thành công trả về một response và check dùng invalidateQueries refetch lại dựa trên FETCH_COURSES
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_ORDER],
        });
        toast.success("Mua khoá học thành công");
      }
    },
    onError: () => {
      toast.error("Mua khoá học thất bại");
    },
  });
}
