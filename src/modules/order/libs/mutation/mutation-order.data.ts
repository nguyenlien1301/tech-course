import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { OrderStatus, QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { getQueryClient } from "@/shared/lib/react-query";
import { CreateOrderParams } from "@/shared/types";

import { createOrder, updateOrder } from "../../actions";

export function useMutationCreateOrder() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrderParams) => {
      const response = await createOrder(data);

      return parseData(response);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FETCH_ORDERS] });
        toast.success("Mua khoá học thành công");
      }
    },
    onError: () => {
      toast.error("Mua khoá học thất bại");
    },
  });
}

export function useMutationUpdateOrder() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: { orderId: string; status: OrderStatus }) =>
      updateOrder(data),

    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_ORDERS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_ORDER_SUMMARY],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_USER_COURSES],
        });
      }
    },

    onError: () => {
      toast.error("Cập nhật đơn hàng thất bại");
    },
  });
}
