import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants";

import { fetchUserCoursesContinue } from "../../actions";

interface QueryFetchUserCourseProps {
  clerkId: string;
}

export const useQueryFetchUserCoursesContinue = ({
  clerkId,
}: QueryFetchUserCourseProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_USER_COURSES, clerkId], // queryKey: là dùng để định danh nếu để trùng thì khi fetch nó fetch nó sẽ fetch 2 cái
    queryFn: async () => {
      const hasResult = await fetchUserCoursesContinue({ clerkId });

      console.log("🚀hasResult---->", hasResult);

      return hasResult || [];
    },
    placeholderData: keepPreviousData, // data tạm.
  });
};
