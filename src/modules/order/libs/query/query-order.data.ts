import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { parseData } from "@/shared/helper";
import { QueryFilter } from "@/shared/types";

import { fetchOrders, fetchOrderSummary, getOrderDetail } from "../../actions";

interface QueryFetchOrderProps extends QueryFilter {}

export const useQueryFetchOrder = (props: QueryFetchOrderProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_ORDERS, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchOrders(props);

      return {
        orders: response?.orders || [],
        total: response?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};

export const useQueryGetOrderDetail = (code: string) => {
  return useQuery({
    enabled: !!code, // chỉ chạy khi có code
    queryKey: [QUERY_KEYS.FETCH_ORDER_DETAIL, code],
    queryFn: async () => {
      const response = await getOrderDetail({ code });

      return parseData(response);
    },
  });
};

export const useQueryFetchOrderSummary = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_ORDER_SUMMARY], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchOrderSummary();

      return response || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};
