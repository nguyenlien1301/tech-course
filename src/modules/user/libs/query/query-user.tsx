import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { QueryFilter } from "@/shared/types";
import { User } from "@/shared/types/models";

import { fetchUsers, fetchUserSummary, getUserInfo } from "../../actions";

interface QueryFetchUserProps extends QueryFilter {}

export const useQueryFetchUser = (props: QueryFetchUserProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_USER, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchUsers(props);

      return {
        users: hasResult?.users || [],
        total: hasResult?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};

export const useQueryFetchUserSummary = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_USER_SUMMARY], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchUserSummary();

      return response || [];
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};

export const useQueryFetchUserInfo = (userId: string) => {
  return useQuery<User | null | undefined>({
    queryKey: [QUERY_KEYS.FETCH_USER_INFO, userId],
    queryFn: async () => await getUserInfo({ userId }),
    enabled: !!userId, // chỉ fetch khi có userId
  });
};
