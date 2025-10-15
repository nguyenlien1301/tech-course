import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { QueryFilter } from "@/shared/types";

import { fetchCoupons, getCouponByCode } from "../../actions";

interface QueryFetchCouponProps extends QueryFilter {}

export const useQueryFetchCoupon = (props: QueryFetchCouponProps) => {
  const { active: isActive, limit, page, search } = props;

  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_COUPON, page, limit, search, isActive], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchCoupons(props);

      if (!response) return;

      return {
        coupons: response?.coupons || [],
        total: response?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};
export const useQueryGetCouponCode = (code: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COUPON_CODE, code], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await getCouponByCode({ code });

      return response;
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};
