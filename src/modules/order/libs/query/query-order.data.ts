import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { QueryFilter } from "@/shared/types";

import { fetchOrders } from "../../actions";

interface QueryFetchOrderProps extends QueryFilter {}

export const useQueryFetchOrder = (props: QueryFetchOrderProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_ORDER, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchOrders(props);

      return {
        orders: response?.orders || [],
        total: response?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};
