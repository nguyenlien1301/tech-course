import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";
import { QueryFilter } from "@/shared/types";

import { fetchComments, fetchCommentSummary } from "../../actions";

interface QueryFetchCommentProps extends QueryFilter {}

export const useQueryFetchComment = (props: QueryFetchCommentProps) => {
  const { limit, page, search, status } = props;

  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COMMENTS, page, limit, search, status], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchComments(props);

      return {
        comments: response?.comments || [],
        total: response?.total || 0,
      };
    },
    placeholderData: keepPreviousData, // data tạm.
    refetchOnWindowFocus: true,
  });
};

export const useQueryFetchCommentsSummary = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COMMENT_SUMMARY], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const response = await fetchCommentSummary();

      return response || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};
